"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

// ─── CRACK PATH ────────────────────────────────────────────────────────────
// viewBox: 0 0 390 844
// Center = x:195. Now drifting ±15px so it's clearly visible as jagged
// Same path used for stroke AND clipPath — guaranteed to match
// ──────────────────────────────────────────────────────────────────────────
const CRACK = [
  "M 195 0",
  "L 192 60",
  "L 200 130",
  "L 188 200",
  "L 203 270",
  "L 186 340",
  "L 205 410",
  "L 190 480",
  "L 202 550",
  "L 187 620",
  "L 198 700",
  "L 193 780",
  "L 195 844",
].join(" ");

// Left clip: everything LEFT of crack
// Crack → bottom-left → top-left → close
const LEFT_CLIP = `${CRACK} L 0 844 L 0 0 Z`;

// Right clip: everything RIGHT of crack
// Crack → bottom-right → top-right → close
const RIGHT_CLIP = `${CRACK} L 390 844 L 390 0 Z`;

// Approximate path length for dasharray
const CRACK_LENGTH = 900;

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftGroupRef = useRef<SVGGElement>(null);
  const rightGroupRef = useRef<SVGGElement>(null);
  const crackRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Safety — wait for paint before animating
    const raf = requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
          onComplete();
        },
      });

      // ── Set initial states ─────────────────────────────────────────
      gsap.set([leftGroupRef.current, rightGroupRef.current], {
        opacity: 0,
      });
      gsap.set([crackRef.current, glowRef.current], {
        strokeDashoffset: CRACK_LENGTH,
        opacity: 0,
      });

      // ── 1. Both panels drop in together (one cookie) ───────────────
      tl.to([leftGroupRef.current, rightGroupRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.4)",
        stagger: 0,
      });

      // ── 2. Hold ────────────────────────────────────────────────────
      tl.to({}, { duration: 0.5 });

      // ── 3. Crack draws itself down ─────────────────────────────────
      tl.to([crackRef.current, glowRef.current], {
        opacity: 1,
        duration: 0.05,
      });
      tl.to([crackRef.current, glowRef.current], {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // ── 5. Brief pause ─────────────────────────────────────────────
      tl.to({}, { duration: 0.15 });

      // ── 6. SPLIT — left flies left, right flies right ──────────────
      tl.to(
        [crackRef.current, glowRef.current],
        {
          opacity: 0,
          duration: 0.1,
        },
        "split",
      );

      tl.to(
        leftGroupRef.current,
        {
          x: -500,
          duration: 0.75,
          ease: "power4.in",
        },
        "split",
      );

      tl.to(
        rightGroupRef.current,
        {
          x: 500,
          duration: 0.75,
          ease: "power4.in",
        },
        "split",
      );
    });

    return () => {
      cancelAnimationFrame(raf);
      gsap.killTweensOf([
        leftGroupRef.current,
        rightGroupRef.current,
        crackRef.current,
        glowRef.current,
        svgRef.current,
      ]);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block" }}
      >
        <defs>
          {/* Left half — everything left of the crack line */}
          <clipPath id="tt-left-clip" clipPathUnits="userSpaceOnUse">
            <path d={LEFT_CLIP} />
          </clipPath>

          {/* Right half — everything right of the crack line */}
          <clipPath id="tt-right-clip" clipPathUnits="userSpaceOnUse">
            <path d={RIGHT_CLIP} />
          </clipPath>
        </defs>

        {/* ── LEFT GROUP — clipped to left of crack ──────────────────── */}
        <g ref={leftGroupRef} clipPath="url(#tt-left-clip)">
          {/* Orange background fills full canvas — clip cuts it */}
          <rect width="390" height="844" fill="#E8470A" />
          <image
            xlinkHref="/cookie.webp"
            href="/cookie.webp"
            x="32%"
            y="32%"
            width="36%"
            height="36%"
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* ── RIGHT GROUP — clipped to right of crack ─────────────────── */}
        <g ref={rightGroupRef} clipPath="url(#tt-right-clip)">
          <rect width="390" height="844" fill="#E8470A" />
          <image
            xlinkHref="/cookie.webp"
            href="/cookie.webp"
            x="32%"
            y="32%"
            width="36%"
            height="36%"
            preserveAspectRatio="xMidYMid meet"
            
          />
        </g>

        {/* ── CRACK — drawn on top of both groups ────────────────────── */}
        {/* Glow */}
        <path
          ref={glowRef}
          d={CRACK}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={CRACK_LENGTH}
          strokeDashoffset={CRACK_LENGTH}
        />
        {/* Main crack */}
        <path
          ref={crackRef}
          d={CRACK}
          stroke="#FFF5EC"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={CRACK_LENGTH}
          strokeDashoffset={CRACK_LENGTH}
        />
      </svg>
    </div>
  );
}
