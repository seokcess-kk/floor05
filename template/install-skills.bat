@echo off
echo ============================================
echo  Vercel Agent Skills 설치 스크립트
echo ============================================
echo.

REM 현재 폴더에 .claude\skills 가 있는지 확인
if not exist ".claude\skills" (
    echo [오류] .claude\skills 폴더가 없습니다.
    echo 프로젝트 루트에서 실행해주세요.
    pause
    exit /b 1
)

echo [1/4] 사용 가능한 스킬 목록 확인 중...
echo.
call npx skills add vercel-labs/agent-skills --list
echo.
echo ============================================

echo [2/4] vercel-react-best-practices 설치 중...
call npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices -a claude-code -y
echo.

echo [3/4] web-design-guidelines 설치 중...
call npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a claude-code -y
echo.

echo [4/4] vercel-composition-patterns 설치 중...
call npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns -a claude-code -y
echo.

echo ============================================
echo  설치 완료! .claude\skills\ 확인:
echo ============================================
dir /B .claude\skills\
echo.
echo 위 목록에 아래 3개가 보여야 정상입니다:
echo   - vercel-react-best-practices
echo   - web-design-guidelines
echo   - vercel-composition-patterns
echo.
pause
