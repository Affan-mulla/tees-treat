"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

// ─── SVG DECORATIVE LINE ──────────────────────────────────────────────────
// Hand-drawn underline that animates under "celebration"
const UNDERLINE_PATH =
  "M0 50 C 20 40, 40 60, 60 50 C 80 40, 100 60, 120 50 C 140 40, 160 60, 180 50 C 200 40, 220 60, 240 50";

export default function CustomCakeBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Floating orb — slow ambient movement ──────────────────────
      gsap.to(orbRef.current, {
        y: -24,
        x: 12,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ── Eyebrow fade up ───────────────────────────────────────────
      gsap.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Line 1 words
      const line1Words = line1Ref.current?.querySelectorAll(".word");
      if (line1Words?.length) {
        gsap.fromTo(
          line1Words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            stagger: 0.045,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Line 2 words
      const line2Words = line2Ref.current?.querySelectorAll(".word");
      if (line2Words?.length) {
        gsap.fromTo(
          line2Words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.75,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            stagger: 0.045,
            delay: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 25%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ── SVG underline draws itself ─────────────────────────────────
      if (underlineRef.current) {
        const len = underlineRef.current.getTotalLength();
        gsap.set(underlineRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: "cubic-bezier(0.5, 0, 0.5, 1)",
          delay: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // ── Body + CTA stagger up ─────────────────────────────────────
      gsap.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          stagger: 0.08,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Parallax on section as footer approaches ────────────────────
      gsap.to(sectionRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1.8,
          markers: false,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-cream py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center px-5 md:px-8 lg:px-16 rounded-4xl z-10"
    >
      {/* ── Ambient orb — decorative blush glow ───────────────────── */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none"
        style={{
          width: "clamp(200px, 40vw, 560px)",
          height: "clamp(200px, 40vw, 560px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242,196,206,0.45) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
        aria-hidden="true"
      />

      {/* ── Noise texture — matches hero ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="cta-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#cta-noise)"
            opacity="0.1"
          />
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-40"
        >
          Custom Orders · Made to Order
        </p>

        {/* Headline */}
        <div className="flex flex-col items-center gap-1">
          <span
            ref={line1Ref}
            className="block overflow-hidden font-caprasimo text-[#1A1A1A] text-[clamp(3rem,7vw,6.5rem)] leading-[1.0]"
          >
            {"Got a celebration".split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-[0.2em]">
                {word}
              </span>
            ))}
          </span>

          {/* Line 2 — "coming up?" with animated SVG underline */}
          <span className="relative inline-block">
            <span
            ref={line2Ref}
            className="block overflow-hidden font-caprasimo text-[#1A1A1A] text-[clamp(3rem,7vw,6.5rem)] leading-[1.0]"
          >
            {"Coming up?".split(" ").map((word, i) => (
              <span key={i} className="word text-orange-primary inline-block mr-[0.2em]">
                {word}
              </span>
            ))}
          </span>


            {/* Hand-drawn SVG underline sits below "coming up?" */}
            <svg
              className="absolute bottom-0 left-0 w-full overflow-visible"
              height="10"
              viewBox="0 0 230 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={underlineRef}
                d={UNDERLINE_PATH}
                stroke="#E8470A"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>

        {/* Body */}
        <p
          ref={bodyRef}
          className="font-dmsans text-[clamp(1.25rem,4.4vw,1.5rem)] mt-4 max-w-[65ch] w-full leading-[1.2] tracking-tight text-chalk opacity-70"
        >
          Birthdays. Weddings. Graduations.
           Any excuse to make something
          beautiful. We make custom cakes that people talk about long after the
          last slice is gone.
        </p>

        {/* CTA */}
        <div ref={ctaRef}>
          <CTAButton href="/contact-us" label="Contact Us" />
        </div>

        {/* Small reassurance line */}
        <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] tracking-[1px] text-chalk opacity-70 uppercase">
          Open Fri · Sat · Sun · Rutherglen
        </p>
      </div>
    </section>
  );
}
