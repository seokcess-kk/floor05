/**
 * 출시된 도구 목록 (중앙 관리)
 * - 새 도구 추가 시 이 파일만 수정
 * - Header, Footer, ToolLayout, 메인 페이지에서 공통 사용
 */

export type ToolCategory = "image" | "text" | "calc";

export interface Tool {
  name: string;
  href: string;
  description: string;
  shortDescription?: string; // Header 드롭다운용 짧은 설명
  category: ToolCategory;
}

export const TOOLS: Tool[] = [
  {
    name: "이미지 압축",
    href: "/tools/image/compress",
    description: "서버 전송 없이 브라우저에서 바로. 목표 용량 설정, 일괄 압축까지.",
    shortDescription: "용량 줄이기",
    category: "image",
  },
  {
    name: "이미지 리사이즈",
    href: "/tools/image/resize",
    description: "px, %, SNS 프리셋으로 크기 조절. 인스타, 유튜브, 네이버 블로그까지.",
    shortDescription: "크기 조절",
    category: "image",
  },
  {
    name: "포맷 변환",
    href: "/tools/image/convert",
    description: "PNG, JPG, WebP 자유롭게 변환. 투명 배경 처리까지.",
    shortDescription: "PNG, JPG, WebP",
    category: "image",
  },
  {
    name: "HEIC → JPG",
    href: "/tools/image/heic-to-jpg",
    description: "아이폰 사진을 JPG로 변환. 회원가입 없이 무제한 무료.",
    shortDescription: "아이폰 사진",
    category: "image",
  },
  {
    name: "이미지 크롭",
    href: "/tools/image/crop",
    description: "원하는 영역만 자르기. 1:1, 4:3, 16:9 비율 프리셋.",
    shortDescription: "자르기",
    category: "image",
  },
  {
    name: "이미지 합치기",
    href: "/tools/image/merge",
    description: "여러 사진을 세로·가로로 한 장에. 캡처 이어붙이기까지.",
    shortDescription: "여러 장 합치기",
    category: "image",
  },
  {
    name: "글자수 세기",
    href: "/tools/text/counter",
    description: "공백·바이트·원고지·자소서 글자수를 한 번에. 붙여넣으면 바로 계산.",
    shortDescription: "글자수·바이트",
    category: "text",
  },
  {
    name: "연봉 실수령액",
    href: "/tools/calc/salary",
    description: "2026년 4대보험·세금을 떼고 매달 통장에 찍히는 금액. 부양가족까지 반영.",
    shortDescription: "월 실수령액",
    category: "calc",
  },
  {
    name: "퇴직금 계산기",
    href: "/tools/calc/severance",
    description: "입사일·퇴사일과 월급으로 퇴직금을 바로. 평균임금·상여·연차수당 반영.",
    shortDescription: "퇴직금",
    category: "calc",
  },
];

/**
 * 카테고리(Room) 메타 — 메인 페이지 섹션 구성에 사용. 배열 순서대로 노출.
 */
export const TOOL_CATEGORIES: {
  id: ToolCategory;
  room: string;
  label: string;
  tagline: string;
}[] = [
  {
    id: "image",
    room: "Room 01",
    label: "Image Tools",
    tagline: "파일이 서버로 전송되지 않습니다. 무제한 무료.",
  },
  {
    id: "text",
    room: "Room 02",
    label: "Text Tools",
    tagline: "붙여넣으면 바로. 입력 내용은 저장·전송되지 않습니다.",
  },
  {
    id: "calc",
    room: "Room 03",
    label: "Calculator",
    tagline: "복잡한 세금·요율은 우리가. 숫자만 넣으면 바로 계산됩니다.",
  },
];

/**
 * 카테고리별 도구 목록
 */
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((tool) => tool.category === category);
}

/**
 * 특정 도구를 제외한 목록 반환
 */
export function getOtherTools(currentHref?: string): Tool[] {
  if (!currentHref) return TOOLS;
  return TOOLS.filter((tool) => tool.href !== currentHref);
}
