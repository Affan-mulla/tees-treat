"use client";

/**
 * SmoothScroll.tsx
 *
 * Changes vs original:
 * - smoothTouch disabled — native momentum scroll on iOS feels better
 *   and Lenis touch interception was causing jank on low-end Android.
 * - duration reduced 1.1 → 0.9 — snappier, less "swimmy" on fast machines.
 * - ScrollTrigger.refresh() deferred to after first paint via
 *   requestAnimationFrame so it doesn't block LCP.
 * - Lenis instance exposed on window in dev for debugging.
 */

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      // smoothTouch intentionally OFF:
      // iOS native momentum scroll is already smooth and buttery.
      // Lenis touch override causes double-smoothing = sluggish feel.
      touchMultiplier: 1.0,
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Defer refresh to after paint — avoids blocking LCP
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // Expose in dev for debugging scroll position / velocity
    if (process.env.NODE_ENV === "development") {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    }

    return () => {
      cancelAnimationFrame(rafId);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}