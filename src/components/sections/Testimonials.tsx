"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── REVIEWS ───────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Holly Wilding",
    rating: 5,
    occasion: "21st Birthday Cake",
    quote: "Without a doubt the best experience I have had with a business when ordering a cake for an event. The design I asked for was something unique and I had worried they wouldn't see my vision — but they most definitely did. The cake is the most amazing tasting cake ever.",
  },
  {
    name: "Dave Matthews",
    rating: 5,
    occasion: "Regular Customer",
    quote: "I like the café. I've been a few times, all the food I've had has been good, the staff are lovely and the coffee is nice. Couldn't ask for anything else.",
  },
  {
    name: "Tee LeSynclair",
    rating: 5,
    occasion: "Bake Box",
    quote: "Delicious stuff. My friend bought a box of 3 items last week — now I'm in buying a box to share with him. Full marks across the board.",
  },
  {
    name: "Mark Fairley",
    rating: 5,
    occasion: "Walk-in",
    quote: "Lovely wee bakery with huge homemade cakes and bakes. Couldn't finish mine in one sitting — which says everything you need to know.",
  },
];

// ─── STAR ──────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E8470A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef    = useRef<HTMLElement>(null);
  const quoteRef      = useRef<HTMLDivElement>(null);
  const nameRef       = useRef<HTMLDivElement>(null);
  const starsRef      = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Animate transition between reviews ────────────────────────────
  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(index);
        setAnimating(false);
      },
    });

    // Exit current — smoother, deliberate exit
    tl.to([quoteRef.current, nameRef.current, starsRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      stagger: 0.05,
    });

    // Enter next — slower, more graceful entrance
    tl.to([quoteRef.current, nameRef.current, starsRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      stagger: 0.05,
    }, "+=0.1");

  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % REVIEWS.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + REVIEWS.length) % REVIEWS.length);
  }, [current, goTo]);

  // ── Auto advance ───────────────────────────────────────────────────
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  // Reset interval on manual navigation
  const handleNav = (fn: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    fn();
    intervalRef.current = setInterval(next, 5000);
  };

  // ── Section entrance ───────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Eyebrow + headline
      gsap.fromTo(
        sectionRef.current?.querySelector(".t-eyebrow") as HTMLElement,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const headWords = sectionRef.current?.querySelectorAll<HTMLSpanElement>(".t-word") as NodeListOf<HTMLSpanElement>;
      if (headWords?.length) {
        gsap.fromTo(headWords,
          { y: "110%", opacity: 0 },
          {
            y: "0%", opacity: 1,
            duration: 0.75, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)", stagger: 0.045,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Big quote block entrance
      gsap.fromTo(
        [starsRef.current, quoteRef.current, nameRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Progress bar entrance
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.0, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Google badge
      gsap.fromTo(
        sectionRef.current?.querySelector(".google-badge") as HTMLElement,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const review = REVIEWS[current];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1A1A1A] overflow-hidden py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16"
    >

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <filter id="t-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#t-noise)" opacity="0.04"/>
        </svg>
      </div>

      {/* Blush orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "clamp(300px, 50vw, 600px)",
          height: "clamp(300px, 50vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,71,10,0.08) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Top row — eyebrow + Google badge ──────────────────────── */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-6">

          {/* Left — eyebrow + headline */}
          <div className="flex flex-col gap-4">
            <p className="t-eyebrow font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] uppercase tracking-[3px] text-[#FFF5EC] opacity-30">
              What people say
            </p>
            <h2 className="font-caprasimo text-[#FFF5EC] text-[clamp(2rem,6vw,3.2rem)] leading-[1.05]">
              {"Don't take our word for it.".split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.22em]">
                  <span
                    className="t-word inline-block"
                    style={{
                      color: i >= 4 ? "#E8470A" : "#FFF5EC",
                      willChange: "transform, opacity",
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h2>
          </div>

          {/* Right — Google badge */}
          <div
            className="google-badge hidden sm:flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ backgroundColor: "rgba(255,245,236,0.06)", border: "1px solid rgba(255,245,236,0.1)" }}
          >
            {/* Google G */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#E8470A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="font-outfit text-[clamp(0.6rem,2.2vw,0.7rem)] text-[#FFF5EC] opacity-30 tracking-[1px]">
                5.0 on Google
              </span>
            </div>
          </div>
        </div>

        {/* ── Large quote block ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">

          {/* Quote */}
          <div className="flex flex-col gap-8">

            {/* Stars */}
            <div ref={starsRef}>
              <Stars count={review.rating} />
            </div>

            {/* The quote */}
            <div ref={quoteRef}>
              {/* Opening quote mark */}
              <span
                className="font-outfit text-[#E8470A] leading-none block mb-2"
                style={{ fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 0.8, opacity: 0.3 }}
                aria-hidden="true"
              >
                "
              </span>
              <blockquote
                className="font-outfit text-[#FFF5EC] text-[clamp(1.2rem,4vw,2.4rem)] leading-tight tracking-tight"
              >
                {review.quote}
              </blockquote>
            </div>

            {/* Name + occasion */}
            <div ref={nameRef} className="flex items-center gap-4">
              {/* Avatar initial */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#E8470A" }}
              >
                <span className="font-caprasimo text-[#FFF5EC] text-[clamp(0.9rem,3vw,1rem)] leading-none">
                  {review.name[0]}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-outfit text-[#FFF5EC] text-[clamp(0.85rem,2.8vw,0.95rem)] font-semibold">
                  {review.name}
                </span>
                <span className="font-outfit text-[#FFF5EC] opacity-30 text-[clamp(0.7rem,2.4vw,0.8rem)] tracking-[1px] uppercase">
                  {review.occasion}
                </span>
              </div>
            </div>
          </div>

          {/* ── Nav arrows — vertical stack on desktop ─────────────── */}
          <div className="flex md:flex-col items-center gap-4 md:gap-4">
            <button
              onClick={() => handleNav(prev)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid rgba(255,245,236,0.15)" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, borderColor: "#E8470A", duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, borderColor: "rgba(255,245,236,0.15)", duration: 0.2 })}
              aria-label="Previous review"
            >
              <span className="text-[#FFF5EC] opacity-60 text-[clamp(1rem,3vw,1.125rem)] md:hidden">←</span>
              <span className="hidden text-[#FFF5EC] opacity-60 text-[clamp(1rem,3vw,1.125rem)] md:inline">↑</span>
            </button>

            {/* Counter */}
            <span className="font-outfit text-[clamp(0.65rem,2.4vw,0.75rem)] text-[#FFF5EC] opacity-25 tracking-[2px]">
              {String(current + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
            </span>

            <button
              onClick={() => handleNav(next)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid rgba(255,245,236,0.15)" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, borderColor: "#E8470A", duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, borderColor: "rgba(255,245,236,0.15)", duration: 0.2 })}
              aria-label="Next review"
            >
              <span className="text-[#FFF5EC] opacity-60 text-[clamp(1rem,3vw,1.125rem)] md:hidden">→</span>
              <span className="hidden text-[#FFF5EC] opacity-60 text-[clamp(1rem,3vw,1.125rem)] md:inline">↓</span>
            </button>
          </div>
        </div>

        {/* ── Progress dots ──────────────────────────────────────────── */}
        <div ref={progressRef} className="flex items-center justify-center gap-3 mt-12">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleNav(() => goTo(i))}
              className="transition-all duration-300"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: i === current ? "#E8470A" : "rgba(255,245,236,0.2)",
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}