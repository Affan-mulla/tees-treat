"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";
import Image from "next/image";
import useMobile from "@/hooks/useMobile";

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

  const ismobile = useMobile();

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

      {/* ── SOFT GRADIENT BACKDROP ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(1200px 600px at 15% 0%, rgba(255, 224, 196, 0.65) 0%, rgba(255, 245, 236, 0) 60%), radial-gradient(900px 500px at 85% 10%, rgba(242, 196, 206, 0.45) 0%, rgba(255, 245, 236, 0) 65%)",
        }}
        aria-hidden="true"
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 pt-24 md:pt-28 pb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start">

          {/* Left — Headline */}
          <div className="flex flex-col gap-5">
            <p className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#1A1A1A] opacity-30">
              Find Us
            </p>
            <h1 className="font-caprasimo text-[#1A1A1A] text-[clamp(2.4rem,6vw,5rem)] leading-[1.0]">
              {"Coffee, cakes, and wagging tails.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
                  <span className="word inline-block" style={{ willChange: "transform, opacity" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="font-dmsans text-[#1A1A1A] opacity-70 text-[clamp(0.95rem,2.6vw,1.05rem)] max-w-xl">
              A neighborhood cafe and bake shop in Rutherglen. Pop in for fresh bakes, stay for
              a slow coffee, and bring the pup.
            </p>

            <p className="hero-address font-dmsans text-[#1A1A1A] opacity-45 text-[clamp(0.95rem,3vw,1rem)] tracking-[0.5px]">
              90 Stonelaw Road · Rutherglen · Glasgow · G73 3ED
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="font-outfit text-[0.7rem] uppercase tracking-[2px] px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A]">
                Cafe + Bake Shop
              </span>
              <span className="font-outfit text-[0.7rem] uppercase tracking-[2px] px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A]">
                Dog Friendly
              </span>
              <span className="font-outfit text-[0.7rem] uppercase tracking-[2px] px-3 py-1 rounded-full bg-[#1A1A1A]/10 text-[#1A1A1A]">
                Walk-ins Welcome
              </span>
            </div>

            <div className="hero-cta w-fit">
              <CTAButton href={MAPS_URL} label="Get Directions" />
            </div>
          </div>

          {/* Right — Visit Card */}
          <div className="rounded-3xl p-6 md:p-8 bg-[#1A1A1A] text-cream shadow-[0_20px_60px_rgba(26,26,26,0.2)]">
            <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-cream/55">
              Plan Your Visit
            </p>

            <div className="mt-5 flex flex-col gap-4">
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
                      className={`font-caprasimo text-[clamp(1rem,3vw,1.2rem)] leading-none ${h.open ? "text-cream" : "text-cream/55"} `}
                    >
                      {h.day}
                    </span>
                    <span
                      className={`font-outfit text-[clamp(0.7rem,2.4vw,0.8rem)] tracking-[1px] ${h.open ? "text-cream" : "text-cream/55"}`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(255,245,236,0.08)" }} />

              <div className="flex flex-col gap-4">
                <address className="not-italic font-dmsans text-cream/55 text-[clamp(0.85rem,2.8vw,0.95rem)] leading-[1.7]">
                  90 Stonelaw Road<br />
                  Rutherglen<br />
                  Glasgow G73 3ED
                </address>

                <a
                  href="tel:01414712727"
                  className="font-caprasimo text-[#E8470A] leading-none hover:opacity-70 transition-opacity duration-200 w-fit"
                  style={{ fontSize: "clamp(1.35rem, 3vw, 1.7rem)" }}
                >
                  0141 471 2727
                </a>

                <p className="font-dmsans text-cream/55 text-[clamp(0.7rem,2.4vw,0.8rem)] leading-[1.7]">
                  Street parking on Stonelaw Road. Bus routes 18 & 31 stop nearby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP + GETTING HERE ───────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16 py-8 md:py-18 lg:py-22">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-stretch">

          {/* LEFT — Map */}
          <div
            ref={mapRef}
            className="w-full rounded-3xl overflow-hidden"
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
                filter: "grayscale(10%) contrast(1.08)",
                minHeight: "clamp(280px, 48vh, 560px)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tee's Treats on Google Maps"
            />
          </div>

          {/* RIGHT — Getting here */}
          <div
            ref={infoRef}
            className="flex flex-col justify-between gap-8 rounded-3xl p-6 md:p-8"
            style={{
              backgroundColor: "#F7E1CD",
              willChange: "transform, opacity",
            }}
          >
            <div className="flex flex-col gap-4">
              <p className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] uppercase tracking-[3px] text-[#1A1A1A]/55">
                Getting Here
              </p>
              <p className="font-caprasimo text-[#1A1A1A] text-[clamp(1.4rem,4vw,1.8rem)] leading-[1.1]">
                Easy to find, easy to linger.
              </p>
              <p className="font-dmsans text-[#1A1A1A]/70 text-[clamp(0.85rem,2.6vw,0.95rem)] leading-[1.7]">
                We are on Stonelaw Road in the heart of Rutherglen. If you are walking the dog,
                grab a coffee to go and swing back for a bake.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl bg-white/80 px-4 py-4">
                <p className="font-outfit text-[0.65rem] uppercase tracking-[2px] text-[#1A1A1A]/50">
                  Parking
                </p>
                <p className="font-dmsans text-[#1A1A1A]/70 text-[clamp(0.8rem,2.6vw,0.9rem)] leading-[1.6]">
                  Street parking on Stonelaw Road and nearby side streets.
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-4">
                <p className="font-outfit text-[0.65rem] uppercase tracking-[2px] text-[#1A1A1A]/50">
                  Buses
                </p>
                <p className="font-dmsans text-[#1A1A1A]/70 text-[clamp(0.8rem,2.6vw,0.9rem)] leading-[1.6]">
                  Routes 18 & 31 stop a short walk away.
                </p>
              </div>
              <div className="rounded-2xl bg-white/80 px-4 py-4">
                <p className="font-outfit text-[0.65rem] uppercase tracking-[2px] text-[#1A1A1A]/50">
                  Accessibility
                </p>
                <p className="font-dmsans text-[#1A1A1A]/70 text-[clamp(0.8rem,2.6vw,0.9rem)] leading-[1.6]">
                  Step-free entry with room for prams and paws.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="tel:01414712727"
                className="font-caprasimo text-[#1A1A1A] leading-none hover:opacity-70 transition-opacity duration-200 w-fit"
                style={{ fontSize: "clamp(1.2rem, 3vw, 1.45rem)" }}
              >
                0141 471 2727
              </a>
              <CTAButton href={MAPS_URL} label="Open in Maps" />
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM STRIP ──────────────────────────────────────────────── */}
      <div
        className="relative z-10 w-full py-7 px-5 md:px-8 lg:px-16 text-center"
        style={{ backgroundColor: "#E8470A" }}
      >
        <p className="font-caprasimo text-[#FFF5EC] text-[clamp(0.9rem,2.2vw,1.3rem)]">
          Cafe & bake shop · Open every Friday, Saturday & Sunday · Dogs always welcome
        </p>
      </div>

    </main>
  );
}