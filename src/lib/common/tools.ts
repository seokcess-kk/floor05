/**
 * 출시된 도구 목록 (중앙 관리)
 * - 새 도구 추가 시 이 파일만 수정
 * - Header, Footer, ToolLayout, 메인 페이지에서 공통 사용
 */

export type ToolCategory = "image" | "text" | "calc" | "date" | "health" | "unit";

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
    description: "PNG, JPG, WebP, AVIF 자유롭게 변환. BMP·GIF·SVG·HEIC 입력까지, 투명 배경 처리도.",
    shortDescription: "PNG, JPG, WebP, AVIF",
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
    name: "워터마크 넣기",
    href: "/tools/image/watermark",
    description: "텍스트·로고를 사진 위에. 위치·투명도·반복까지, 여러 장 일괄.",
    shortDescription: "워터마크 삽입",
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
  {
    name: "만 나이 계산기",
    href: "/tools/date/age",
    description: "생년월일만 넣으면 만 나이·연 나이·띠를 바로. 다음 생일 D-Day까지.",
    shortDescription: "만 나이·띠",
    category: "date",
  },
  {
    name: "D-Day 계산기",
    href: "/tools/date/dday",
    description: "목표일까지 며칠 남았는지, 그날부터 며칠 지났는지. 100일·1000일·기념일까지.",
    shortDescription: "디데이·기념일",
    category: "date",
  },
  {
    name: "음력 양력 변환",
    href: "/tools/date/lunar",
    description: "음력 생일을 올해 양력으로, 양력을 음력으로. 윤달·간지까지 반영.",
    shortDescription: "음력↔양력",
    category: "date",
  },
  {
    name: "BMI 계산기",
    href: "/tools/health/bmi",
    description: "키·몸무게로 체질량지수와 비만도를. 대한비만학회 기준 구간·표준체중 범위까지.",
    shortDescription: "체질량지수·비만도",
    category: "health",
  },
  {
    name: "기초대사량 계산기",
    href: "/tools/health/bmr",
    description: "기초대사량(BMR)과 하루 권장 칼로리(TDEE). 감량·유지·증량 목표 칼로리까지.",
    shortDescription: "BMR·TDEE",
    category: "health",
  },
  {
    name: "배란일 계산기",
    href: "/tools/health/ovulation",
    description: "마지막 생리일과 주기로 배란 예정일·가임기·다음 생리일을. 입력은 저장되지 않습니다.",
    shortDescription: "배란일·가임기",
    category: "health",
  },
  {
    name: "임신 주수 계산기",
    href: "/tools/health/pregnancy",
    description: "마지막 생리일로 현재 임신 주수와 출산예정일을. 삼분기·진행률까지.",
    shortDescription: "임신주수·출산예정일",
    category: "health",
  },
  {
    name: "평수 변환",
    href: "/tools/unit/pyeong",
    description: "평을 제곱미터(㎡)로, ㎡를 평으로 양방향 즉시 변환. 분양·전용면적 안내까지.",
    shortDescription: "평↔㎡",
    category: "unit",
  },
  {
    name: "길이 변환",
    href: "/tools/unit/length",
    description: "cm·인치·m·피트·mm·km를 한 화면에서 즉시 변환. 어느 칸에 넣어도 바로.",
    shortDescription: "cm·인치·m",
    category: "unit",
  },
  {
    name: "온도 변환",
    href: "/tools/unit/temperature",
    description: "섭씨·화씨·켈빈을 양방향 즉시 변환. 화씨 100도가 몇 도인지 바로.",
    shortDescription: "섭씨·화씨·켈빈",
    category: "unit",
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
  {
    id: "date",
    room: "Room 04",
    label: "Date Tools",
    tagline: "날짜만 넣으면 끝. 입력은 저장·전송되지 않습니다.",
  },
  {
    id: "health",
    room: "Room 05",
    label: "Health Tools",
    tagline: "참고용 추정치예요. 입력은 저장·전송되지 않습니다.",
  },
  {
    id: "unit",
    room: "Room 06",
    label: "Unit Tools",
    tagline: "어느 칸에 넣어도 나머지가 바로. 양방향 즉시 변환.",
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

/**
 * href로 도구 조회 (문의 폼 prefill 등에 사용)
 */
export function getToolByHref(href?: string | null): Tool | undefined {
  if (!href) return undefined;
  return TOOLS.find((tool) => tool.href === href);
}
