"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeSize?: string;
  afterSize?: string;
  className?: string;
}

/**
 * Before/After 슬라이더 비교 컴포넌트
 * - 드래그로 비교 영역 조절
 * - 원본/결과 이미지 비교
 * - 파일 크기 표시
 */
export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "원본",
  afterLabel = "결과",
  beforeSize,
  afterSize,
  className = "",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 컨테이너 너비 측정 (클라이언트 전용)
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 슬라이더 위치 계산
  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // 마우스 이벤트
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculatePosition(e.clientX);
  }, [calculatePosition]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 터치 이벤트
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    calculatePosition(e.touches[0].clientX);
  }, [calculatePosition]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      calculatePosition(e.touches[0].clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 키보드로 슬라이더 조작
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    }
  }, []);

  return (
    <div className={`relative select-none ${className}`}>
      {/* 라벨 */}
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-brand-mid uppercase tracking-wider">
            {beforeLabel}
          </span>
          {beforeSize && (
            <span className="text-xs text-brand-light">{beforeSize}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {afterSize && (
            <span className="text-xs text-brand-accent font-medium">{afterSize}</span>
          )}
          <span className="font-mono text-xs text-brand-mid uppercase tracking-wider">
            {afterLabel}
          </span>
        </div>
      </div>

      {/* 비교 컨테이너 */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="이미지 비교 슬라이더"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative w-full aspect-video bg-brand-paper rounded-lg overflow-hidden cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
      >
        {/* After 이미지 (전체) */}
        <div className="absolute inset-0">
          <img
            src={afterSrc}
            alt={afterLabel}
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Before 이미지 (클리핑) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="h-full object-contain"
            style={{
              width: containerWidth ?? "100%",
              maxWidth: "none",
            }}
            draggable={false}
          />
        </div>

        {/* 슬라이더 라인 */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-accent z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* 슬라이더 핸들 */}
          <div
            className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-11 h-11 rounded-full
              bg-brand-accent
              flex items-center justify-center
              shadow-lg
              transition-transform
              ${isDragging ? "scale-110" : ""}
            `}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Before/After 라벨 오버레이 */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-brand-black/70 rounded text-xs text-brand-paper font-mono">
          {beforeLabel}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-brand-accent/90 rounded text-xs text-white font-mono">
          {afterLabel}
        </div>
      </div>
    </div>
  );
}
