/**
 * 날짜·건강 도구 E2E — page.clock.setFixedTime으로 '오늘'을 고정해 결정적 검증
 * expected는 달력·의학 표준 공식으로 별도 산출한 golden value
 */
import { test, expect } from "@playwright/test";
import { installGuards, assertClean, fillStable } from "./helpers";

const TODAY = new Date("2026-08-13T12:00:00");

test.describe("만 나이", () => {
  test("1995-03-07생 → 만 31세 · 돼지띠 (기준일 2026-08-13)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/age");
    await fillStable(page.locator("#birth"), "1995-03-07");
    const main = page.locator("main");
    await expect(main.getByText("만 31세 5개월 6일")).toBeVisible();
    await expect(main.getByText("돼지띠")).toBeVisible();
    await expect(main.getByText("32세")).toBeVisible(); // 세는 나이
    assertClean(guards);
  });

  test("2/29 출생 → 다음 생일 D-200 (비윤년 3/1 보정)", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/age");
    await fillStable(page.locator("#birth"), "2000-02-29");
    await expect(page.locator("main").getByText("D-200")).toBeVisible();
    await expect(page.locator("main").getByText("용띠")).toBeVisible();
  });

  test("오늘이 생일 → 축하 표시", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/age");
    await fillStable(page.locator("#birth"), "2000-08-13");
    await expect(page.getByText("오늘이 생일입니다")).toBeVisible();
  });

  test("미래 출생일 → 안내 문구 (크래시 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/age");
    await fillStable(page.locator("#base"), "1990-01-01"); // 기준일을 출생(1995) 전으로
    await expect(page.getByText("생년월일을 입력하면 만 나이가 바로 계산됩니다")).toBeVisible();
    assertClean(guards);
  });
});

test.describe("D-Day", () => {
  test("카운트다운: 기본 +100일 = D-100, 오늘 = D-DAY, 과거 = D+", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/dday");
    const big = page.locator("main .text-5xl"); // 결과 박스 (가이드 본문의 D-DAY 언급과 구분)
    await expect(big).toHaveText("D-100");
    await fillStable(page.locator("#target"), "2026-08-13");
    await expect(big).toHaveText("D-DAY");
    await fillStable(page.locator("#target"), "2026-08-10");
    await expect(big).toHaveText("D+3");
    assertClean(guards);
  });

  test("기념일: 2026-01-01 시작 → 225일째 · 100일 = 4/10", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/dday");
    await page.getByRole("button", { name: /지난 날 · 기념일/ }).click();
    await fillStable(page.locator("#start"), "2026-01-01");
    const main = page.locator("main");
    await expect(main.getByText("225")).toBeVisible();
    await expect(main.getByText("2026년 4월 10일 (금)")).toBeVisible(); // 100일
    await expect(main.getByText("2027년 1월 1일 (금)")).toBeVisible(); // 1주년
  });
});

test.describe("음력↔양력", () => {
  test("음력 2026-01-01 → 양력 2026-02-17 (설날)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/lunar");
    await page.getByRole("button", { name: "음력 → 양력" }).click();
    await page.getByLabel("년").fill("2026");
    await page.getByLabel("월", { exact: true }).fill("1");
    await page.getByLabel("일", { exact: true }).fill("1");
    await expect(page.locator("main").getByText("2026년 2월 17일").first()).toBeVisible();
    assertClean(guards);
  });

  test("양력 2026-09-25 → 음력 2026. 8. 15 (추석)", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/lunar");
    await fillStable(page.locator("#solar"), "2026-09-25");
    await expect(page.locator("main").getByText("2026. 8. 15")).toBeVisible();
  });

  test("존재하지 않는 윤달 → 안내 문구", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/date/lunar");
    await page.getByRole("button", { name: "음력 → 양력" }).click();
    await page.getByLabel("년").fill("2026");
    await page.getByLabel("월", { exact: true }).fill("6");
    await page.getByLabel("일", { exact: true }).fill("1");
    await page.getByRole("checkbox").check(); // 윤달
    await expect(page.getByText("변환할 수 없는 날짜입니다")).toBeVisible();
  });
});

test.describe("BMI", () => {
  test("170cm · 60kg → BMI 20.8 정상 · 정상범위 53.5~66.2kg", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/health/bmi");
    await page.getByLabel("몸무게(kg)").fill("60");
    const main = page.locator("main");
    await expect(main.getByText("20.8")).toBeVisible();
    await expect(main.getByText("53.5 ~ 66.2 kg")).toBeVisible();
    await expect(main.getByText("현재 정상 범위입니다")).toBeVisible();
    assertClean(guards);
  });

  test("비만 구간: 170cm · 90kg → BMI 31.1 · 2단계 비만 · 감량 필요량 표시", async ({ page }) => {
    await page.goto("/tools/health/bmi");
    await page.getByLabel("몸무게(kg)").fill("90");
    const main = page.locator("main");
    await expect(main.getByText("31.1")).toBeVisible();
    await expect(main.getByText("2단계 비만").first()).toBeVisible();
    await expect(main.getByText(/약 23.8kg 감량/)).toBeVisible(); // 90 − 66.2
  });

  test("키 0 → 안내 문구 (크래시 없음)", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/health/bmi");
    await page.getByLabel("키(cm)").fill("0");
    await expect(page.getByText("키와 몸무게를 입력하면 BMI가 바로 계산됩니다")).toBeVisible();
    assertClean(guards);
  });
});

test.describe("기초대사량", () => {
  test("남 30세 175cm 70kg 좌식 → BMR 1,649 · TDEE 1,979", async ({ page }) => {
    const guards = await installGuards(page);
    await page.goto("/tools/health/bmr");
    await page.getByLabel("키(cm)").fill("175");
    await page.getByLabel("몸무게(kg)").fill("70");
    await page.getByRole("button", { name: /거의 안 함/ }).click();
    const main = page.locator("main");
    await expect(main.getByText("1,649")).toBeVisible();
    await expect(main.getByText("1,979").first()).toBeVisible();
    await expect(main.getByText("1,479")).toBeVisible(); // 감량
    await expect(main.getByText("2,379")).toBeVisible(); // 증량
    assertClean(guards);
  });

  test("여성 전환 시 −166kcal (공식 상수 차이)", async ({ page }) => {
    await page.goto("/tools/health/bmr");
    await page.getByLabel("키(cm)").fill("160");
    await page.getByLabel("몸무게(kg)").fill("50");
    await page.getByLabel("나이(세)").fill("25");
    await page.getByRole("button", { name: "여성" }).click();
    await page.getByRole("button", { name: /거의 안 함/ }).click();
    await expect(page.locator("main").getByText("1,214")).toBeVisible();
  });
});

test.describe("배란일", () => {
  test("마지막 생리 2026-08-01 · 28일 주기 → 배란 8/15 · 가임기 8/10~16", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/health/ovulation");
    await fillStable(page.locator("#last"), "2026-08-01");
    const main = page.locator("main");
    await expect(main.getByText("2026년 8월 15일 (토)")).toBeVisible();
    await expect(main.getByText(/2026년 8월 10일/)).toBeVisible();
    await expect(main.getByText("향후 주기 예측")).toBeVisible();
    assertClean(guards);
  });

  test("주기 19일(범위 밖) → 안내 문구", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/health/ovulation");
    await fillStable(page.locator("#cycle"), "19");
    await expect(page.getByText("생리 주기는 20~45일 사이로 입력해 주세요")).toBeVisible();
  });
});

test.describe("임신 주수", () => {
  test("LMP 2026-01-01 → 32주 0일 · 예정일 2026-10-08 · D-56", async ({ page }) => {
    const guards = await installGuards(page);
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/health/pregnancy");
    await fillStable(page.locator("#lmp"), "2026-01-01");
    const main = page.locator("main");
    await expect(main.getByText("임신 후기 (3삼분기)")).toBeVisible();
    await expect(main.getByText("2026년 10월 8일 (목)")).toBeVisible();
    await expect(main.getByText("D-56")).toBeVisible();
    await expect(main.getByText("80%")).toBeVisible();
    assertClean(guards);
  });

  test("LMP가 미래 → 안내 문구", async ({ page }) => {
    await page.clock.setFixedTime(TODAY);
    await page.goto("/tools/health/pregnancy");
    await fillStable(page.locator("#lmp"), "2026-09-01");
    await expect(page.getByText(/기준일보다 앞서고/)).toBeVisible();
  });
});
