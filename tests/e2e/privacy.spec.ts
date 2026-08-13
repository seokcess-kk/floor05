/**
 * 제품 핵심 계약 검증: 파일이 서버·제3자로 전송되지 않는다 (P0)
 * - 파일 처리 전체 흐름 동안 모든 네트워크 요청을 기록
 * - 외부 호스트로 body가 실린 요청 0건 / 동일 출처 대용량 POST 0건 확인
 */
import { test, expect } from "@playwright/test";
import {
  installGuards,
  assertClean,
  assertNoFileUpload,
  uploadToDropzone,
  saveDownload,
  detectKind,
  fx,
} from "./helpers";

test("이미지 압축 전 과정에서 파일 데이터 외부 전송 없음", async ({ page }, testInfo) => {
  const guards = await installGuards(page);
  await page.goto("/tools/image/compress");
  await uploadToDropzone(page, [fx("photo-1200x900.jpg"), fx("exif-gps.jpg")]);
  await page.getByRole("button", { name: "2개 이미지 압축하기" }).click();
  await expect(page.getByRole("button", { name: /ZIP 다운로드/ })).toBeVisible({ timeout: 30_000 });
  const file = await saveDownload(page, testInfo, () =>
    page.getByRole("button", { name: /ZIP 다운로드/ }).click(),
  );
  expect(detectKind(file)).toBe("zip");

  assertNoFileUpload(guards);
  assertClean(guards);
});

test("PDF 합치기 전 과정에서 파일 데이터 외부 전송 없음", async ({ page }, testInfo) => {
  const guards = await installGuards(page);
  await page.goto("/tools/pdf/merge");
  await uploadToDropzone(page, [fx("a4-1p.pdf"), fx("letter-3p.pdf")]);
  await expect(page.getByText("3페이지")).toBeVisible({ timeout: 15_000 });
  const file = await saveDownload(page, testInfo, () =>
    page.getByRole("button", { name: "2개 PDF 합치기" }).click(),
  );
  expect(detectKind(file)).toBe("pdf");

  assertNoFileUpload(guards);
  assertClean(guards);
});

test("EXIF 삭제(민감 GPS 데이터) 처리 중 외부 요청에 body 없음", async ({ page }, testInfo) => {
  const guards = await installGuards(page);
  await page.goto("/tools/image/exif-remove");
  await uploadToDropzone(page, [fx("exif-gps.jpg")]);
  await expect(page.getByText("⚠ 위치정보(GPS) 포함")).toBeVisible();
  await saveDownload(page, testInfo, () =>
    page.getByRole("button", { name: "EXIF 제거하고 다운로드" }).click(),
  );

  assertNoFileUpload(guards);

  // 참고 리포트: 처리 중 시도된 외부 요청(광고·분석 GET)의 수를 기록
  const external = guards.requests.filter((r) => !r.url.includes("localhost"));
  testInfo.annotations.push({
    type: "external-requests",
    description: `${external.length}건 (모두 GET·body 없음): ${[...new Set(external.map((r) => new URL(r.url).host))].join(", ") || "없음"}`,
  });
});
