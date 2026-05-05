"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=90+Stonelaw+Road+Rutherglen+Glasgow+G73+3ED";

const HOURS = [
  { day: "Friday",    time: "9am – 5pm",  open: true  },
  { day: "Saturday",  time: "9am – 5pm",  open: true  },
  { day: "Sunday",    time: "10am – 4pm", open: true  },
  { day: "Mon – Thu", time: "Closed",     open: false },
];

export default function FindUsPage() {
  const heroRef   = useRef<HTMLElement>(null);
  const mapRef    = useRef<HTMLDivElement>(null);
  const infoRef   = useRef<HTMLDivElement>(null);
  const dogRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Hero words ───────────────────────────────────────────────
      const words = heroRef.current?.querySelectorAll<HTMLSpanElement>(".word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.055, delay: 0.3 },
        );
      }

      gsap.fromTo(
        heroRef.current?.querySelector(".hero-address") as HTMLParagraphElement,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.85 },
      );

      gsap.fromTo(
        heroRef.current?.querySelector(".hero-cta") as HTMLButtonElement,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 1.0 },
      );

      mm.add("(min-width: 768px)", () => {
        // ── Map slides in from left ───────────────────────────────
        gsap.fromTo(
          mapRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // ── Info slides in from right ────────────────────────────
        gsap.fromTo(
          infoRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        // ── Map + info fade up on mobile ─────────────────────────
        gsap.fromTo(
          mapRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );

        gsap.fromTo(
          infoRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // ── Dog banner fades up ─────────────────────────────────────
      gsap.fromTo(
        dogRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dogRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // ── Parallax on dog banner as footer approaches ─────────────────
      gsap.to(dogRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: dogRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1.8,
          markers: false,
        },
      });

      return () => mm.revert();
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#FFF5EC] min-h-screen relative z-10 flex flex-col">

      {/* ── NOISE ─────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="find-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#find-noise)" opacity="0.04"/>
        </svg>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-24 md:pt-28 pb-12"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Left — Headline */}
          <div className="flex flex-col gap-4">
            <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-30">
              Find Us
            </p>
            <h1 className="font-caprasimo text-[#1A1A1A] text-[clamp(2.2rem,6vw,5rem)] leading-[1.0]">
              {"Come say hello.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
                  <span className="word inline-block" style={{ willChange: "transform, opacity" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Address line */}
            <p className="hero-address font-dmsans text-[#1A1A1A] opacity-40 text-[clamp(0.95rem,3vw,1rem)] tracking-[0.5px]">
              90 Stonelaw Road · Rutherglen · Glasgow · G73 3ED
            </p>
          </div>

          {/* Right — CTA */}
          <div className="hero-cta flex-shrink-0">
            <CTAButton href={MAPS_URL} label="Get Directions" />
          </div>
        </div>
      </section>

      {/* ── MAP + INFO GRID ───────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-stretch">

          {/* LEFT — Map */}
          <div
            ref={mapRef}
            className="w-full rounded-2xl overflow-hidden"
            style={{
              minHeight: "clamp(280px, 48vh, 560px)",
              willChange: "transform, opacity",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2239.892156!2d-4.2154!3d55.8298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888469e4f5e8d9b%3A0x4b3b7b3b7b3b7b3b!2s90%20Stonelaw%20Rd%2C%20Rutherglen%2C%20Glasgow%20G73%203ED!5e0!3m2!1sen!2suk!4v1234567890!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(15%) contrast(1.05)",
                minHeight: "clamp(280px, 48vh, 560px)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tee's Treats on Google Maps"
            />
          </div>

          {/* RIGHT — All the info */}
          <div
            ref={infoRef}
            className="flex flex-col justify-between gap-8 rounded-2xl p-8 md:p-10"
            style={{
              backgroundColor: "#1A1A1A",
              willChange: "transform, opacity",
            }}
          >

            {/* Hours */}
            <div className="flex flex-col gap-4">
              <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-[#FFF5EC] opacity-25">
                Opening Hours
              </p>
              <div className="flex flex-col gap-0">
                {HOURS.map((h, i) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-3"
                    style={{
                      borderBottom: i < HOURS.length - 1
                        ? "1px solid rgba(255,245,236,0.08)"
                        : "none",
                    }}
                  >
                    <span
                      className="font-caprasimo text-[clamp(1rem,3vw,1.2rem)] leading-none"
                      style={{ color: h.open ? "#FFF5EC" : "rgba(255,245,236,0.2)" }}
                    >
                      {h.day}
                    </span>
                    <span
                      className="font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] tracking-[1px]"
                      style={{ color: h.open ? "#E8470A" : "rgba(255,245,236,0.2)" }}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", backgroundColor: "rgba(255,245,236,0.08)" }} />

            {/* Address + Phone */}
            <div className="flex flex-col gap-5">
              <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-[#FFF5EC] opacity-25">
                Address & Contact
              </p>

              <address className="not-italic font-dmsans text-[#FFF5EC] opacity-50 text-[clamp(0.85rem,2.8vw,0.95rem)] leading-[1.8]">
                90 Stonelaw Road<br />
                Rutherglen<br />
                Glasgow G73 3ED
              </address>

              {/* Phone — big, tap to call */}
              <a
                href="tel:01414712727"
                className="font-caprasimo text-[#E8470A] leading-none hover:opacity-70 transition-opacity duration-200 w-fit"
                style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
              >
                0141 471 2727
              </a>

              {/* Parking note */}
              <p className="font-dmsans text-[#FFF5EC] opacity-25 text-[clamp(0.7rem,2.4vw,0.8rem)] leading-[1.7]">
                Street parking on Stonelaw Road.<br />
                Bus routes 18 & 31 stop nearby.
              </p>
            </div>

            {/* CTA */}
            <CTAButton href={MAPS_URL} label="Open in Maps" />

          </div>
        </div>
      </section>

      {/* ── DOG FRIENDLY BANNER ───────────────────────────────────────── */}
      <div
        ref={dogRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32"
      >
        <div
          className="w-full rounded-2xl px-6 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ backgroundColor: "#F2C4CE" }}
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <span className="text-[clamp(1.8rem,6vw,2.2rem)]">🐾</span>
            <div className="flex flex-col gap-0.5">
              <span className="font-caprasimo text-[#1A1A1A] text-[clamp(1rem,3vw,1.2rem)] leading-none">
                Four legs welcome. Always.
              </span>
              <span className="font-dmsans text-[#1A1A1A] opacity-60 text-[clamp(0.75rem,2.6vw,0.875rem)]">
                Dogs welcome inside · Water bowl always out · Treats available
              </span>
            </div>
          </div>

          {/* Right — pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: "rgba(26,26,26,0.08)" }}
          >
            <span className="font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] text-[#1A1A1A] opacity-60 uppercase tracking-[1px]">
              Dog Friendly Café
            </span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP ──────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full py-7 px-5 md:px-8 lg:px-16 text-center"
        style={{ backgroundColor: "#E8470A" }}
      >
        <p className="font-caprasimo text-[#FFF5EC] text-[clamp(0.9rem,2.2vw,1.3rem)]">
          Open every Friday, Saturday & Sunday · Dogs always welcome · 90 Stonelaw Road, Rutherglen
        </p>
      </div>

    </main>
  );
}