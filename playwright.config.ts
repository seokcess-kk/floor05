import { defineConfig, devices } from "@playwright/test";

/**
 * floor05 E2E 설정
 * - 로컬: 프로덕션 빌드를 next start(3010)로 띄워 테스트 (npm run build 선행 필요)
 * - 프로젝트: Chromium(데스크톱·모바일) + WebKit(데스크톱)
 * - 프로덕션 smoke: PROD_E2E=1 환경변수로 tests/e2e-prod만 실행 (playwright.prod.config.ts 사용)
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: [["list"], ["json", { outputFile: "test-results/e2e-report.json" }]],
  use: {
    baseURL: "http://localhost:3010",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npx next start -p 3010",
    url: "http://localhost:3010",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
