/**
 * 계산기 6종 E2E — 화면에 표시되는 결과값을 독립 산출 golden value와 대조
 * (unit 테스트와 같은 수치를 사용하되, 여기서는 실제 UI 렌더 값을 검증)
 */
import { test, expect } from "@playwright/test";
import { installGuards, assertClean, fillStable } from "./helpers";

test.describe("연봉 실수령액", () => {
  test("연봉 5,000만 → 월 실수령 3,533,147원 + 공제 내역", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/salary");
    await fillStable(page.getByLabel("연봉(만원)"), "5000");

    const main = page.locator("main");
    await expect(main.getByText("3,533,147")).toBeVisible();
    await expect(main.getByText("188,410")).toBeVisible(); // 국민연금
    await expect(main.getByText("142,600")).toBeVisible(); // 건강보험
    await expect(main.getByText("18,730")).toBeVisible(); // 장기요양
    await expect(main.getByText("35,700")).toBeVisible(); // 고용보험 (floor10 FP 수정 검증)
    await expect(main.getByText("225,530")).toBeVisible(); // 근로소득세
    await expect(main.getByText("22,550")).toBeVisible(); // 지방소득세
    assertClean(guards);
  });

  test("연봉 3억 → 국민연금 상한(313,020원) 적용", async ({ page }) => {
    await page.goto("/tools/calc/salary");
    await page.getByLabel("연봉(만원)").fill("30000");
    await page.getByLabel("월 비과세액(만원)").fill("0");
    await expect(page.locator("main").getByText("313,020")).toBeVisible();
  });

  test("연봉 0 → 실수령 0원 (빈 입력 안전)", async ({ page }) => {
    await page.goto("/tools/calc/salary");
    await page.getByLabel("연봉(만원)").fill("0");
    await expect(page.locator("main").getByText("월 예상 실수령액")).toBeVisible();
    const net = page.locator("main .font-mono.text-5xl").first();
    await expect(net).toHaveText(/^0/);
  });
});

test.describe("퇴직금", () => {
  test("3년 재직 · 월 300만 → 8,812,388원", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/severance");
    await fillStable(page.getByLabel("입사일"), "2023-01-01");
    await fillStable(page.getByLabel("퇴직일"), "2026-01-01");
    const main = page.locator("main");
    await expect(main.getByText("8,812,388")).toBeVisible();
    await expect(main.getByText("1,096").first()).toBeVisible(); // 재직일수
    assertClean(guards);
  });

  test("1년 미만 → 대상 아님 경고", async ({ page }) => {
    await page.goto("/tools/calc/severance");
    await page.getByLabel("입사일").fill("2025-09-01");
    await page.getByLabel("퇴직일").fill("2026-01-01");
    await expect(page.getByText(/법정 퇴직금 지급 대상이 아닙니다/)).toBeVisible();
  });

  test("퇴직일 < 입사일 → 안내 문구 (계산 불가)", async ({ page }) => {
    await page.goto("/tools/calc/severance");
    await page.getByLabel("입사일").fill("2026-01-01");
    await page.getByLabel("퇴직일").fill("2025-01-01");
    await expect(page.getByText(/올바르게 입력하면 퇴직금이 계산됩니다/)).toBeVisible();
  });

  test("상여 1,200만 → 3개월분 300만 가산 표시", async ({ page }) => {
    await page.goto("/tools/calc/severance");
    await page.getByLabel("연간 상여금(만원)").fill("1200");
    await expect(page.getByText("상여금 가산 (×3/12)")).toBeVisible();
    await expect(page.locator("main").getByText("3,000,000원")).toBeVisible();
  });
});

test.describe("주휴수당", () => {
  test("2026 최저시급 · 주 40시간 → 주휴수당 82,560원 · 월 2,152,339원", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/wage");
    const main = page.locator("main");
    await expect(main.getByText("82,560").first()).toBeVisible();
    await expect(main.getByText("412,800").first()).toBeVisible();
    await expect(main.getByText("495,360").first()).toBeVisible();
    await expect(main.getByText("2,152,339").first()).toBeVisible();
    assertClean(guards);
  });

  test("주 14시간 → 주휴수당 미발생", async ({ page }) => {
    await page.goto("/tools/calc/wage");
    await page.getByLabel("1주 소정근로시간").fill("14");
    await expect(page.getByText("주휴수당 발생 대상이 아닙니다")).toBeVisible();
  });

  test("시급 0 → 결과 미표시 (크래시 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/wage");
    await page.getByLabel("시급(원)").fill("0");
    await expect(page.getByText("주휴수당 (1주)")).toBeHidden();
    assertClean(guards);
  });
});

test.describe("대출이자", () => {
  test("1억 · 4.8% · 12개월 3방식 비교", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/loan");
    await page.getByLabel("대출 원금(만원)").fill("10000");
    await page.getByLabel("연이율(%)").fill("4.8");
    await page.getByLabel("대출 기간(개월)").fill("12");

    const main = page.locator("main");
    // 원리금균등 (기본)
    await expect(main.getByText("8,551,586").first()).toBeVisible();
    await expect(main.getByText("2,619,028원").first()).toBeVisible();
    // 원금균등
    await page.getByRole("button", { name: /원금균등/ }).click();
    await expect(main.getByText("8,733,333").first()).toBeVisible();
    await expect(main.getByText(/마지막 달 8,366,667원/).first()).toBeVisible();
    await expect(main.getByText("2,600,000원").first()).toBeVisible();
    // 만기일시
    await page.getByRole("button", { name: /만기일시/ }).click();
    await expect(main.getByText("400,000").first()).toBeVisible();
    await expect(main.getByText("4,800,000원").first()).toBeVisible();
    await expect(main.getByText("104,800,000원").first()).toBeVisible();
    assertClean(guards);
  });

  test("금리 0% → 원금/개월 · 총이자 0", async ({ page }) => {
    await page.goto("/tools/calc/loan");
    await page.getByLabel("대출 원금(만원)").fill("1200");
    await page.getByLabel("연이율(%)").fill("0");
    await page.getByLabel("대출 기간(개월)").fill("12");
    const main = page.locator("main");
    await expect(main.getByText("1,000,000")).toBeVisible();
    await expect(main.getByText("0원").first()).toBeVisible();
  });

  test("기간 0 → 결과 숨김 (크래시 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/loan");
    await page.getByLabel("대출 기간(개월)").fill("0");
    await expect(page.getByText("매월 상환액")).toBeHidden();
    assertClean(guards);
  });
});

test.describe("예적금 이자", () => {
  test("예금 단리 1,000만 · 3% · 12개월 → 세후 10,253,800원", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/savings");
    const main = page.locator("main");
    await expect(main.getByText("10,253,800")).toBeVisible();
    await expect(main.getByText("300,000원")).toBeVisible(); // 세전 이자
    await expect(main.getByText("-46,200원")).toBeVisible(); // 이자소득세
    assertClean(guards);
  });

  test("적금 단리 월 100만 · 3.65% · 12개월 → 세전이자 237,250원", async ({ page }) => {
    await page.goto("/tools/calc/savings");
    await page.getByRole("button", { name: /적금 \(매월 납입\)/ }).click();
    await page.getByLabel("월 납입액(만원)").fill("100");
    await page.getByLabel("연이율(%)").fill("3.65");
    const main = page.locator("main");
    await expect(main.getByText("237,250원")).toBeVisible();
    await expect(main.getByText(/원금 12,000,000원/)).toBeVisible();
  });

  test("월복리 전환 시 이자 증가 (예금 3% 12개월 = 304,160원)", async ({ page }) => {
    await page.goto("/tools/calc/savings");
    await page.getByRole("button", { name: "월복리" }).click();
    await expect(page.locator("main").getByText("304,160원")).toBeVisible();
  });
});

test.describe("부가세", () => {
  test("공급가 100만 → 부가세 10만 · 합계 110만", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/vat");
    const main = page.locator("main");
    await expect(main.getByText("100,000").first()).toBeVisible();
    await expect(main.getByText("1,100,000").first()).toBeVisible();
    assertClean(guards);
  });

  test("합계 100만 역산 → 공급가 909,091 · 부가세 90,909", async ({ page }) => {
    await page.goto("/tools/calc/vat");
    await page.getByRole("button", { name: /합계로/ }).click();
    const main = page.locator("main");
    await expect(main.getByText("909,091")).toBeVisible();
    await expect(main.getByText("90,909")).toBeVisible();
  });

  test("음수/빈 입력 → 0 처리 (크래시 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/calc/vat");
    await page.getByLabel("금액").fill("");
    await expect(page.locator("main").getByText("공급가액").first()).toBeVisible();
    assertClean(guards);
  });
});
