"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

const HOURS = [
  { day: "Friday", time: "9am – 5pm" },
  { day: "Saturday", time: "9am – 5pm" },
  { day: "Sunday", time: "10am – 4pm" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/teestreatsrutherglen/",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/teestreatsrutherglen",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@teestreatsrutherglen",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
];

// Big stamp text split into letters for stagger animation
const STAMP = "TEES TREATS".split("");

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // ── Left col slides in from left ──────────────────────────
        gsap.fromTo(
          leftRef.current,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // ── Right col slides in from right ────────────────────────
        gsap.fromTo(
          rightRef.current,
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        // ── Mobile fade up to avoid horizontal overflow ──────────
        gsap.fromTo(
          [leftRef.current, rightRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // ── Divider draws left to right ───────────────────────────────
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "cubic-bezier(0.5, 0, 0.5, 1)",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Bottom row fades up ───────────────────────────────────────
      gsap.fromTo(
        bottomRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 10%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Stamp letters drop in one by one ─────────────────────────
      // Each letter falls from above with stagger
      gsap.fromTo(
        lettersRef.current,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          scrollTrigger: {
            trigger: stampRef.current,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-chalk px-2 pt-16 md:pt-24 lg:pt-32 pb-0 overflow-hidden"
    >
      {/* ── Noise texture ─────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="footer-noise">
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
            filter="url(#footer-noise)"
            opacity="0.04"
          />
        </svg>
      </div>

      <div className="relative z-0 max-w-7xl mx-auto">
        {/* ── ASYMMETRIC TOP SECTION ────────────────────────────────
            Left 55% — brand identity + CTA
            Right 45% — hours + address + socials
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-16 md:gap-8 pb-16">
          {/* LEFT — Brand block */}
          <div ref={leftRef} className="flex flex-col justify-between gap-12">
            {/* Brand identity */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="w-fit">
                <span className="font-caprasimo text-[clamp(2.8rem,5vw,4.5rem)] text-[#E8470A] leading-[1.0] block hover:opacity-80 transition-opacity duration-200">
                  Tee&apos;s Treats
                </span>
              </Link>
              <p className="font-dmsans text-[#FFF5EC] opacity-60 text-[clamp(0.95rem,3vw,1rem)] leading-[1.8] max-w-xs">
                Coffee House & Bakeshop.
                <br />
                Rutherglen, Glasgow.
                <br />
                Open three days. Worth every one.
              </p>
            </div>

            {/* CTA */}
            <CTAButton href="/contact-us" label="Contact Us" className="" />
          </div>

          {/* RIGHT — Info block */}
          <div ref={rightRef} className="flex flex-col gap-10">
            {/* Hours */}
            <div className="flex flex-col gap-2">
              <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-[#FFF5EC] opacity-25 mb-3">
                Opening Hours
              </p>
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-center justify-between py-3 border-b border-[#FFF5EC]/8"
                >
                  <span className="font-outfit font-semibold text-cream text-[clamp(1rem,3vw,1.2rem)] leading-none">
                    {h.day}
                  </span>
                  <span className="font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] text-cream opacity-60 tracking-[1px]">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-[#FFF5EC] opacity-55 mb-1">
                Find Us
              </p>
              <address className="not-italic font-dmsans text-[#FFF5EC] opacity-50 text-[clamp(0.85rem,2.8vw,0.95rem)] leading-[1.8]">
                90 Stonelaw Road
                <br />
                Rutherglen, Glasgow
              </address>
            </div>

            {/* Socials + dog friendly */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {SOCIALS.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-[#FFF5EC] opacity-70 hover:opacity-100 hover:text-[#E8470A] transition-all duration-200"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm size-5 text-cream">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--ph"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M104 140a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm60 12a12 12 0 1 0-12-12a12 12 0 0 0 12 12Zm68.7-8a16.1 16.1 0 0 1-6.7 1.4a15.6 15.6 0 0 1-10-3.6V184a40 40 0 0 1-40 40H80a40 40 0 0 1-40-40v-42.2a15.6 15.6 0 0 1-10 3.6a16.1 16.1 0 0 1-6.7-1.4a15.8 15.8 0 0 1-9.1-17.6l16.4-87.5a16.1 16.1 0 0 1 19.6-12.6L105 40h46l54.8-13.7a16.1 16.1 0 0 1 19.6 12.6l16.4 87.5a15.8 15.8 0 0 1-9.1 17.6ZM200 122l-51.9-66h-40.2L56 122v62a24.1 24.1 0 0 0 24 24h40v-12.7l-13.7-13.6a8.1 8.1 0 0 1 11.4-11.4l10.3 10.4l10.3-10.4a8.1 8.1 0 0 1 11.4 11.4L136 195.3V208h40a24.1 24.1 0 0 0 24-24Z"
                    ></path>
                  </svg>
                </span>
                <span className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] text-[#FFF5EC] opacity-75 tracking-[1px] uppercase">
                  Dog Friendly
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────── */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-[#FFF5EC]/8"
          style={{ transformOrigin: "left center" }}
        />

        {/* ── BOTTOM ROW ────────────────────────────────────────────── */}
        <div
          ref={bottomRef}
          className="flex flex-col md:flex-row items-center justify-between gap-3 py-5"
        >
          <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] text-[#FFF5EC] opacity-20 tracking-[1px]">
            © {new Date().getFullYear()} Tee&apos;s Treats. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {["Menu", "Find Us", "Contact Us"].map((item, i) => (
              <Link
                key={i}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="min-h-[44px] px-2 font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] text-[#FFF5EC] opacity-80 hover:opacity-60 hover:text-orange-hover hover:opacity-100 tracking-[1px] uppercase transition-all duration-200 flex items-center"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FULL BLEED STAMP ──────────────────────────────────────────
          "TEE'S TREATS" spans the entire footer width.
          Each letter is individually referenced for stagger animation.
          overflow-hidden on parent clips letters as they drop in.
          pb-0 on footer means this sits flush at the very bottom.
      ──────────────────────────────────────────────────────────────── */}
      <div
        ref={stampRef}
        className="w-full overflow-hidden"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        {/* Letter-spacing and font-size tuned so text spans full width */}
        <div className="flex  w-full justify-between ">
          {STAMP.map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) lettersRef.current[i] = el;
              }}
              className="inline-block font-outfit text-cream/20 leading-[0.75] select-none pointer-events-none  text-[clamp(4rem,15vw,20rem)] "
              style={{
                opacity: letter === "'" || letter === " " ? 0.06 : 0.06,
                willChange: "transform, opacity",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
