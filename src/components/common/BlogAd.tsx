import AdSlot from "./AdSlot";

/**
 * 블로그 본문용 인콘텐츠 광고.
 * - .prose 내부에 들어가도 본문 타이포가 적용되지 않도록 not-prose로 격리
 * - 콘텐츠와 광고를 명확히 구분하기 위해 작은 "광고" 라벨 표시
 *   (AdSense 정책상 허용되는 라벨은 "광고"/"스폰서 링크"뿐이므로 다른 문구 금지)
 * - blog-inline 슬롯(반응형, 사각형 계열) 재사용. 광고 ID 미설정 시 AdSlot이
 *   아무것도 렌더하지 않으므로 빈 박스가 남지 않는다.
 *
 * 본문 하단(BlogExtras) 또는 본문 중간 섹션 사이에 한 줄로 삽입:
 *   <BlogAd />
 */
export default function BlogAd({ className = "" }: { className?: string }) {
  return (
    <div className={`not-prose my-10 ${className}`}>
      <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-widest text-brand-light/70">
        광고
      </p>
      <AdSlot slot="blog-inline" />
    </div>
  );
}
