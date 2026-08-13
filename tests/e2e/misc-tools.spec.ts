/**
 * 단위변환·색상·글자수·랜덤 도구 E2E
 */
import { test, expect } from "@playwright/test";
import { installGuards, assertClean } from "./helpers";

test.describe("단위 변환", () => {
  test("길이: 170cm → 66.9291in · 1.7m (양방향)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/unit/length");
    await expect(page.locator("#unit-inch")).toHaveValue("66.9291");
    await expect(page.locator("#unit-m")).toHaveValue("1.7");
    // 역방향: 인치 칸에 입력
    await page.locator("#unit-inch").fill("1");
    await expect(page.locator("#unit-cm")).toHaveValue("2.54");
    assertClean(guards);
  });

  test("평수: 32평 → 105.785㎡, 84.9㎡ → 25.68평", async ({ page }) => {
    await page.goto("/tools/unit/pyeong");
    await expect(page.locator("#unit-sqm")).toHaveValue("105.785");
    await page.locator("#unit-sqm").fill("84.9");
    await expect(page.locator("#unit-pyeong")).toHaveValue(/^25\.68/);
  });

  test("온도: 100°C → 212°F · 373.15K, −40 교차점", async ({ page }) => {
    await page.goto("/tools/unit/temperature");
    await page.locator("#unit-c").fill("100");
    await expect(page.locator("#unit-f")).toHaveValue("212");
    await expect(page.locator("#unit-k")).toHaveValue("373.15");
    await page.locator("#unit-f").fill("-40");
    await expect(page.locator("#unit-c")).toHaveValue("-40");
  });

  test("빈 입력 → 다른 칸도 빈 값 (0 강제 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/unit/length");
    await page.locator("#unit-cm").fill("");
    await expect(page.locator("#unit-inch")).toHaveValue("");
    assertClean(guards);
  });
});

test.describe("색상 코드 변환", () => {
  test("HEX #FF8000 입력 → RGB·HSL·CMYK 동시 표시", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/color/converter");
    await page.locator("#hex").fill("#FF8000");
    const main = page.locator("main");
    await expect(main.getByText("rgb(255, 128, 0)")).toBeVisible();
    await expect(main.getByText("hsl(30, 100%, 50%)")).toBeVisible();
    await expect(main.getByText("cmyk(0%, 50%, 100%, 0%)")).toBeVisible();
    assertClean(guards);
  });

  test("rgb() 형식 입력도 인식", async ({ page }) => {
    await page.goto("/tools/color/converter");
    await page.locator("#hex").fill("rgb(0, 0, 255)");
    await expect(page.locator("main").getByText("#0000FF")).toBeVisible();
  });

  test("복사 버튼 → 클립보드에 값 복사", async ({ page, context, browserName }) => {
    test.skip(browserName === "webkit", "WebKit 클립보드 권한 제약");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/tools/color/converter");
    await page.getByRole("button", { name: "복사" }).first().click();
    await expect(page.getByRole("button", { name: "복사됨" })).toBeVisible();
    const text = await page.evaluate(() => navigator.clipboard.readText());
    expect(text).toBe("#C45C2C");
  });
});

test.describe("색상 대비 검사", () => {
  test("기본 #333333/흰색 → 12.63:1 전 기준 통과", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/color/contrast");
    const main = page.locator("main");
    await expect(main.getByText("12.63")).toBeVisible();
    // 판정 4칸 전부 통과 (가이드 조견표의 '통과' 텍스트와 구분: 판정 스타일 클래스 기준)
    expect(await main.locator(".text-green-600").count()).toBe(4);
    expect(await main.locator(".text-red-500").count()).toBe(0);
    assertClean(guards);
  });

  test("#777777/흰색 → 4.48:1 · AA 일반 텍스트 실패 (fill 입력)", async ({ page }) => {
    await page.goto("/tools/color/contrast");
    await page.locator('input[type="text"]').first().fill("#777777");
    const main = page.locator("main");
    await expect(main.getByText("4.48")).toBeVisible();
    // 4.48 → AA큰(≥3)만 통과, AA일반(4.5)·AAA일반(7)·AAA큰(4.5) 실패
    expect(await main.getByText("실패", { exact: true }).count()).toBe(3);
  });

  test("HEX 텍스트 키 입력(글자 단위 타이핑)이 가능해야 함", async ({ page }) => {
    await page.goto("/tools/color/contrast");
    const input = page.locator('input[type="text"]').first();
    await input.click();
    await input.clear();
    await input.pressSequentially("777777", { delay: 40 });
    await expect(page.locator("main").getByText("4.48")).toBeVisible({ timeout: 5_000 });
  });
});

test.describe("CSS 그라데이션", () => {
  test("기본 선형 코드 표시 + 원형 전환 + 각도 조절", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/color/gradient");
    const code = page.locator("main code");
    await expect(code).toContainText("linear-gradient(90deg, #C45C2C 0%, #0A0A0A 100%)");
    await page.getByRole("button", { name: "원형" }).click();
    await expect(code).toContainText("radial-gradient(circle");
    await page.getByRole("button", { name: "선형" }).click();
    await page.locator('input[type="range"]').first().fill("180");
    await expect(code).toContainText("linear-gradient(180deg");
    assertClean(guards);
  });

  test("색 추가/삭제: 최대 5개 · 최소 2개", async ({ page }) => {
    await page.goto("/tools/color/gradient");
    const addBtn = page.getByRole("button", { name: "+ 색 추가" });
    await addBtn.click();
    await addBtn.click();
    await addBtn.click(); // 5개
    await expect(addBtn).toBeHidden();
    const delBtns = page.getByRole("button", { name: "정지점 삭제" });
    expect(await delBtns.count()).toBe(5);
    for (let i = 0; i < 3; i++) await delBtns.first().click();
    await expect(delBtns.first()).toBeDisabled(); // 2개 남으면 비활성
  });
});

test.describe("글자수 세기", () => {
  test("한/영 혼합 텍스트 통계 (독립 검산값)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/text/counter");
    await page.getByLabel("글자수를 셀 텍스트 입력").fill("안녕하세요 hello");
    const main = page.locator("main");
    await expect(main.locator(".text-5xl")).toHaveText("11"); // 5+1+5
    await expect(main.getByText("16 B")).toBeVisible(); // 2바이트 기준 10+1+5
    await expect(main.getByText("21 B")).toBeVisible(); // UTF-8 15+1+5
    assertClean(guards);
  });

  test("줄바꿈 기준: 네이버(공백 치환) vs HWP(제거)", async ({ page }) => {
    await page.goto("/tools/text/counter");
    await page.getByLabel("글자수를 셀 텍스트 입력").fill("a\nb");
    const big = page.locator("main .text-5xl");
    await expect(big).toHaveText("3");
    await page.getByRole("button", { name: "한글(HWP)" }).click();
    await expect(big).toHaveText("2");
  });

  test("지우기 + 입력 유지(localStorage 복원)", async ({ page }) => {
    await page.goto("/tools/text/counter");
    const ta = page.getByLabel("글자수를 셀 텍스트 입력");
    await ta.fill("복원 테스트 텍스트");
    await page.waitForTimeout(600); // 자동저장 디바운스
    await page.reload();
    await expect(ta).toHaveValue("복원 테스트 텍스트");
    await page.getByRole("button", { name: "지우기" }).click();
    await expect(ta).toHaveValue("");
  });

  test("원고지: 1,001자 → 6매 (200자지)", async ({ page }) => {
    await page.goto("/tools/text/counter");
    await page.getByLabel("글자수를 셀 텍스트 입력").fill("가".repeat(1001));
    await expect(page.locator("main").getByText("6매")).toBeVisible();
    await expect(page.locator("main").getByText(/199칸 남음/)).toBeVisible();
  });
});

test.describe("사다리타기", () => {
  test("사다리 생성 → 출발 → 결과 표시", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/random/ladder");
    await page.getByRole("button", { name: "사다리 만들기" }).click();
    // 가로줄이 그려졌는지 (세로줄 4개 + 가로줄 ≥1)
    expect(await page.locator("svg line").count()).toBeGreaterThan(4);
    await page.getByLabel("참가자 1").fill("철수");
    await page.getByRole("button", { name: "1번에서 출발" }).click();
    // 결과 스트립 (검정 박스): "철수 → 결과"
    const resultBox = page.locator("main div.bg-brand-black").filter({ hasText: "→" });
    await expect(resultBox).toBeVisible();
    await expect(resultBox).toContainText("철수");
    assertClean(guards);
  });

  test("인원 변경 2~8", async ({ page }) => {
    await page.goto("/tools/random/ladder");
    await page.getByRole("button", { name: "8", exact: true }).click();
    expect(await page.getByLabel(/^참가자 \d+$/).count()).toBe(8);
    await page.getByRole("button", { name: "2", exact: true }).click();
    expect(await page.getByLabel(/^참가자 \d+$/).count()).toBe(2);
  });
});

test.describe("룰렛", () => {
  test("돌리기 → 당첨 항목 표시 (항목 중 하나)", async ({ page }) => {
    test.setTimeout(90_000);
    const guards = await installGuards(page);
    await page.goto("/tools/random/roulette");
    await page.getByRole("button", { name: "돌리기" }).click();
    await expect(page.getByText("돌리는 중…").first()).toBeVisible();
    await expect(page.locator("main").getByText("🎉")).toBeVisible({ timeout: 15_000 });
    const winner = await page
      .locator("main div.bg-brand-black span.text-brand-accent")
      .first()
      .textContent();
    expect(["한식", "중식", "일식", "양식", "분식", "치킨"]).toContain(winner?.trim());
    assertClean(guards);
  });

  test("항목 2개 미만이면 돌리기 비활성", async ({ page }) => {
    await page.goto("/tools/random/roulette");
    // 6개 중 4개 삭제 → 2개 (버튼 활성) → 항목 비우기 → 비활성
    const delBtns = page.getByRole("button", { name: "삭제", exact: true });
    for (let i = 0; i < 4; i++) await delBtns.first().click();
    await page.getByLabel("항목 1", { exact: true }).fill("");
    await expect(page.getByRole("button", { name: "돌리기" })).toBeDisabled();
  });

  test("항목 추가 최대 12개", async ({ page }) => {
    await page.goto("/tools/random/roulette");
    const addBtn = page.getByRole("button", { name: "+ 항목 추가" });
    for (let i = 0; i < 6; i++) await addBtn.click();
    await expect(addBtn).toBeHidden();
    expect(await page.getByLabel(/^항목 \d+$/, { exact: true }).count()).toBe(12);
  });
});
