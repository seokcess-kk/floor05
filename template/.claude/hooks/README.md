# Hooks 가이드 (자동 검증)

## Stop Hook — Phase 1에서 바로 설정

Stop Hook은 AI가 작업을 마칠 때마다 자동으로 빌드를 돌립니다.
빌드가 깨진 채로 넘어가는 걸 막아줍니다.

Phase 1에서 `.claude\settings.json`을 만들 때 아래 내용을 넣으세요:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "[빌드 명령어] 2>&1 | tail -20"
        }]
      }
    ]
  }
}
```

`[빌드 명령어]`는 프로젝트에 맞게 바꿉니다:
- Next.js: `pnpm build`
- Vite: `pnpm build`
- Python: `python -m py_compile main.py`

**주의사항**:
- 이 명령어가 30초 넘게 걸리면 타임아웃됨 → 가벼운 명령어만
- Stop Hook이 실패하면 AI가 작업을 끝낼 수 없게 됨 → 수동으로 한번 돌려본 뒤 설정
- `tail -20`은 에러 메시지 마지막 20줄만 AI에게 전달 (토큰 절약)

---

## 그 외 Hook — 필요할 때 추가

Stop Hook 외에 다른 Hook은 처음부터 넣지 않아도 됩니다.
반복되는 문제가 생기면 그때 추가하세요.

| 이런 문제가 반복되면 | 이 Hook을 추가 | 이벤트 |
|-------------------|--------------|--------|
| AI가 스킬 규칙을 안 읽고 작업함 | skill-activation | UserPromptSubmit |
| 파일을 수정한 뒤 뭘 바꿨는지 잊어버림 | post-tool-tracker | PostToolUse |
