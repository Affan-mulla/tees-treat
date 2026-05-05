"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

// ─── PAGE TRANSITION OVERLAY ───────────────────────────────────────────────
//
// HOW IT WORKS:
// A full-screen orange div sits fixed on top of everything at z-[9998]
// (just below the preloader z-[9999]).
//
// On route change (pathname changes):
//   1. ENTER  — overlay scales in from center (scaleY 0 → 1), covers page
//   2. EXIT   — overlay scales out upward (scaleY 1 → 0), reveals new page
//
// The overlay uses transformOrigin to control direction:
//   Enter: "bottom center" — grows upward from bottom
//   Exit:  "top center"    — shrinks upward, like a curtain lifting
//
// SETUP in layout.tsx:
//   Import this component and place it inside the root layout,
//   OUTSIDE of {children}, as a sibling to the main content.
//   It must be in a Client Component context.
//
// ──────────────────────────────────────────────────────────────────────────

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();
  const isFirst    = useRef(true);

  useEffect(() => {
    // Skip the very first render — preloader handles the initial load
    if (isFirst.current) {
      isFirst.current = false;
      // Make sure overlay is hidden on first load
      gsap.set(overlayRef.current, { scaleY: 0, transformOrigin: "top center" });
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // ── ENTER — orange wipes up from bottom covering the screen ─────
    const tl = gsap.timeline();

    tl.set(overlay, { scaleY: 0, transformOrigin: "bottom center" })
      .to(overlay, {
        scaleY: 1,
        duration: 0.45,
        ease: "power4.inOut",
      })
      // Brief hold so new page content loads underneath
      .to({}, { duration: 0.1 })
      // ── EXIT — orange wipes up off screen revealing new page ──────
      .set(overlay, { transformOrigin: "top center" })
      .to(overlay, {
        scaleY: 0,
        duration: 0.5,
        ease: "power4.inOut",
      });

  // pathname change triggers the animation
  }, [pathname]);

  return (
    <>
      {/* Orange wipe overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          backgroundColor: "#E8470A",
          transformOrigin: "bottom center",
          transform: "scaleY(0)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* Optional: Tee's Treats text that appears during transition */}
      {/* Sits centered on the overlay — visible while orange covers screen */}
      <div
        className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
        aria-hidden="true"
        style={{ opacity: 0 }}
        id="transition-logo"
      >
        <span
          className="font-caprasimo text-[#FFF5EC] text-[clamp(2rem,6vw,4rem)] leading-none"
          style={{ mixBlendMode: "difference" }}
        >
          Tee's Treats
        </span>
      </div>
    </>
  );
}