/**
 * 출시된 도구 목록 (중앙 관리)
 * - 새 도구 추가 시 이 파일만 수정
 * - Header, Footer, ToolLayout, 메인 페이지에서 공통 사용
 */

export interface Tool {
  name: string;
  href: string;
  description: string;
  shortDescription?: string; // Header 드롭다운용 짧은 설명
}

export const TOOLS: Tool[] = [
  {
    name: "이미지 압축",
    href: "/tools/image/compress",
    description: "서버 전송 없이 브라우저에서 바로. 목표 용량 설정, 일괄 압축까지.",
    shortDescription: "용량 줄이기",
  },
  {
    name: "이미지 리사이즈",
    href: "/tools/image/resize",
    description: "px, %, SNS 프리셋으로 크기 조절. 인스타, 유튜브, 네이버 블로그까지.",
    shortDescription: "크기 조절",
  },
  {
    name: "포맷 변환",
    href: "/tools/image/convert",
    description: "PNG, JPG, WebP 자유롭게 변환. 투명 배경 처리까지.",
    shortDescription: "PNG, JPG, WebP",
  },
  {
    name: "HEIC → JPG",
    href: "/tools/image/heic-to-jpg",
    description: "아이폰 사진을 JPG로 변환. 회원가입 없이 무제한 무료.",
    shortDescription: "아이폰 사진",
  },
  {
    name: "이미지 크롭",
    href: "/tools/image/crop",
    description: "원하는 영역만 자르기. 1:1, 4:3, 16:9 비율 프리셋.",
    shortDescription: "자르기",
  },
];

/**
 * 특정 도구를 제외한 목록 반환
 */
export function getOtherTools(currentHref?: string): Tool[] {
  if (!currentHref) return TOOLS;
  return TOOLS.filter((tool) => tool.href !== currentHref);
}
