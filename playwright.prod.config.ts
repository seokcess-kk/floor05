import { defineConfig, devices } from "@playwright/test";

/**
 * 프로덕션(https://www.floor05.com) 비파괴 smoke 테스트 전용 설정
 * 실행: npm run test:e2e:prod
 */
export default defineConfig({
  testDir: "./tests/e2e-prod",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: 1,
  workers: 2,
  reporter: [["list"]],
  use: {
    baseURL: "https://www.floor05.com",
    trace: "retain-on-failure",
  },
  projects: [{ name: "prod-chromium", use: { ...devices["Desktop Chrome"] } }],
});
