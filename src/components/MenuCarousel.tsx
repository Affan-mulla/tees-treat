"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ForwardedRef,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";

type MenuCarouselHandle = {
  scrollPrev: () => void;
  scrollNext: () => void;
};

type MenuCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
};

const MenuCarousel = forwardRef(function MenuCarousel<T>(
  {
    items,
    renderItem,
    className = "",
    itemClassName = "",
    ariaLabel = "Carousel",
  }: MenuCarouselProps<T>,
  ref: ForwardedRef<MenuCarouselHandle>,
) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const momentumTweenRef = useRef<gsap.core.Tween | null>(null);

  const doubledItems = useMemo(() => {
    if (!items.length) return [] as T[];
    return [...items, ...items];
  }, [items]);

  const getScrollAmount = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstItem = track.querySelector<HTMLElement>("[data-carousel-item]");
    if (!firstItem) return Math.max(track.clientWidth * 0.8, 240);

    const styles = getComputedStyle(track);
    const gapValue = Number.parseFloat(styles.columnGap || styles.gap || "0");
    const itemWidth = firstItem.getBoundingClientRect().width;
    return itemWidth + (Number.isNaN(gapValue) ? 0 : gapValue);
  }, []);

  const scrollByAmount = useCallback((direction: number) => {
    const track = trackRef.current;
    if (!track) return;

    const amount = getScrollAmount();
    if (!amount) return;

    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }, [getScrollAmount]);

  useImperativeHandle(ref, () => ({
    scrollPrev: () => scrollByAmount(-1),
    scrollNext: () => scrollByAmount(1),
  }), [scrollByAmount]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    momentumTweenRef.current?.kill();
    isDraggingRef.current = true;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    track.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !isDraggingRef.current) return;

    const now = performance.now();
    const dx = event.clientX - lastXRef.current;
    const dt = Math.max(1, now - lastTimeRef.current);

    track.scrollLeft -= dx;
    velocityRef.current = dx / dt;
    lastXRef.current = event.clientX;
    lastTimeRef.current = now;
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      track.releasePointerCapture(event.pointerId);

      const velocity = velocityRef.current;
      if (Math.abs(velocity) > 0.02) {
        const momentum = Math.min(600, Math.max(-600, velocity * 450));
        momentumTweenRef.current = gsap.to(track, {
          scrollLeft: track.scrollLeft - momentum,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    handlePointerUp(event);
  }, [handlePointerUp]);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const loopWidth = loopWidthRef.current;
    if (!loopWidth) return;

    if (track.scrollLeft <= 0) {
      track.scrollLeft += loopWidth;
    } else if (track.scrollLeft >= loopWidth * 2 - track.clientWidth) {
      track.scrollLeft -= loopWidth;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;

    const updateLoopWidth = () => {
      const totalWidth = track.scrollWidth;
      loopWidthRef.current = totalWidth / 2;
      if (track.scrollLeft === 0) {
        track.scrollLeft = loopWidthRef.current;
      }
    };

    updateLoopWidth();
    window.addEventListener("resize", updateLoopWidth);
    return () => window.removeEventListener("resize", updateLoopWidth);
  }, [items.length]);

  return (
    <div className={className}>
        
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2 select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onScroll={handleScroll}
        style={{ touchAction: "pan-y", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {doubledItems.map((item, index) => (
          <div
            key={`carousel-item-${index}`}
            data-carousel-item
            className={itemClassName}
          >
            {renderItem(item, index % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
});

export type { MenuCarouselHandle };
export default MenuCarousel;
