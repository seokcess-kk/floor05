import { useEffect, useState } from "react";
import { getMaxBatchSize } from "./fileUtils";

/**
 * `active`가 true인 동안 페이지 이탈(새로고침/뒤로가기/탭 닫기) 시
 * 브라우저 확인창을 띄운다. 처리 중인 작업이 경고 없이 사라지는 것을 막는다.
 * (브라우저 처리 특성상 진행 중 작업은 복구 불가)
 */
export function useBeforeUnload(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [active]);
}

/**
 * 일괄 처리 최대 장수.
 * SSR/초기 렌더는 데스크톱 기준(10)으로 고정해 하이드레이션 불일치를 막고,
 * 마운트 후 실제 기기 값(모바일 5)으로 갱신한다.
 */
export function useMaxBatchSize(): number {
  const [max, setMax] = useState(10);
  useEffect(() => {
    setMax(getMaxBatchSize());
  }, []);
  return max;
}
