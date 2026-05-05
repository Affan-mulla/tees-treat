"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── SVG ARROW PATHS ──────────────────────────────────────────────────────
// Arrow 1 — curvy arrow pointing right (near "we bake")
const ARROW_1 =
  "M3 94.6748C27.4641 99.4874 46.3246 102.55 65.0444 83.8304C73.9796 74.8953 76.1503 62.8261 69.8444 51.4748C58.3692 30.8185 36.6188 61.9308 52.6 71.9193C81.897 90.2303 107.995 53.7887 112.155 28.3637C113.368 20.9544 114.609 12.5035 115 5.07481C115.339 -1.36878 117.032 6.28246 117.844 8.63037C119.35 12.9801 121.884 16.4674 123.356 20.7192C125.931 28.1593 122.746 21.3428 121.755 17.8748C118.913 7.92667 118.724 -1.31665 108.6 8.27481C106.563 10.205 95.3631 19.2352 97.3999 19.4748C103.175 20.1542 109.598 23.9571 115 24.2748C122.394 24.7098 126.464 27.2512 116.6 22.3192C113.382 20.71 110.214 19.6588 107 18.2304C101.703 15.8763 109.23 17.7389 109.844 18.2304C111.629 19.6579 116.523 20.3297 111.8 18.2304C110.584 17.6899 105.386 16.2748 107 16.2748C112.097 16.2748 118.803 21.3653 116.956 17.8748C115.403 14.9415 113.389 14.4872 110.2 14.6748C109.114 14.7386 105.166 17.8748 107 17.8748";

// Arrow 2 — swooping arrow (near "we pour")
const ARROW_2 =
  "M93.0681 3C72.3063 18.0061 57.7731 25.925 32.2716 21.1435C26.0822 19.983 15.9133 18.8754 10.945 14.459C8.12295 11.9505 3.74946 11.7165 9.24741 9.57834C13.7751 7.81753 20.3406 4.90981 25.2689 4.90981C27.0487 4.90981 9.62202 9.55411 4.26061 10.7455C-2.59384 12.2686 20.5637 33.6269 24.314 37.3771";

// ─── CLIP PATHS ───────────────────────────────────────────────────────────
const CLIP_BLOB =
  "M0.752120 0.063706 C0.746781 0.053157 0.740564 0.040872 0.737887 0.033486 L0.936579 0.000166 C0.937051 0.001128 0.937935 0.003037 0.939758 0.006713 C0.941192 0.009605 0.942627 0.012448 0.944264 0.015692 C0.945763 0.018661 0.947431 0.021966 0.949423 0.025952 C0.957095 0.041300 0.966826 0.061322 0.975597 0.082892 C0.984278 0.104239 0.992659 0.128636 0.996959 0.152724 C1.001030 0.175515 1.002760 0.204629 0.990697 0.232208 C0.980685 0.255101 0.955521 0.281472 0.908742 0.291922 C0.916072 0.299633 0.922806 0.307330 0.928689 0.314918 C0.941677 0.331671 0.956287 0.354981 0.957388 0.381047 C0.958693 0.411941 0.940360 0.443862 0.896253 0.465044 C0.894310 0.465978 0.892362 0.466866 0.890411 0.467711 C0.895729 0.471705 0.900782 0.475615 0.905538 0.479430 C0.918484 0.489812 0.931099 0.500932 0.941450 0.512321 C0.951014 0.522844 0.962993 0.538241 0.967621 0.556570 C0.972813 0.577133 0.969151 0.605972 0.936458 0.629605 C0.924636 0.638151 0.911497 0.644133 0.898614 0.648344 C0.913991 0.658695 0.928984 0.669785 0.941345 0.681191 C0.952538 0.691520 0.968270 0.708075 0.974260 0.728748 C0.981711 0.754460 0.973011 0.786276 0.933888 0.808864 C0.928534 0.811955 0.923002 0.814627 0.917406 0.816938 C0.925529 0.835790 0.926948 0.860056 0.908257 0.884087 C0.889464 0.908248 0.858704 0.921114 0.835639 0.927997 C0.784674 0.943205 0.732693 0.941327 0.689267 0.934070 C0.646181 0.926871 0.604385 0.913257 0.566558 0.898286 C0.540564 0.887998 0.514111 0.876100 0.487845 0.863426 C0.521648 0.900409 0.545067 0.945246 0.545067 1.000000 L0.340424 1.000000 C0.340424 0.940284 0.283232 0.903277 0.188247 0.855105 C0.183721 0.852810 0.178981 0.850429 0.174078 0.847966 C0.135329 0.828502 0.086419 0.803935 0.053000 0.776309 C0.032444 0.759317 0.012808 0.737525 0.004319 0.710523 C-0.004475 0.682550 0.000432 0.654497 0.016565 0.627696 C0.026161 0.611756 0.041393 0.595372 0.065247 0.582459 C0.074604 0.577393 0.084455 0.573315 0.094566 0.570115 C0.087409 0.565160 0.080683 0.560142 0.074501 0.555072 C0.051978 0.536603 0.008915 0.494785 0.035225 0.444831 C0.044106 0.427970 0.061671 0.408320 0.094286 0.395567 C0.105024 0.391369 0.115836 0.388528 0.126361 0.386704 C0.123797 0.384392 0.121313 0.382082 0.118914 0.379775 C0.096036 0.357778 0.060002 0.316728 0.077757 0.270221 C0.083730 0.254575 0.096619 0.234029 0.125381 0.218433 C0.156097 0.201778 0.191093 0.198171 0.219150 0.199947 C0.226445 0.200409 0.233601 0.201252 0.240580 0.202393 C0.226967 0.177725 0.217407 0.141639 0.249005 0.106647 C0.262595 0.091598 0.283519 0.076624 0.313911 0.067824 C0.344236 0.059043 0.374021 0.059294 0.397945 0.062754 C0.440583 0.068920 0.476228 0.086911 0.500076 0.100634 C0.501387 0.101388 0.502702 0.102154 0.504021 0.102930 C0.508360 0.093746 0.515610 0.084381 0.526996 0.075347 C0.567860 0.042923 0.623477 0.044263 0.653879 0.049457 C0.681638 0.054199 0.705685 0.064096 0.721623 0.071338 C0.736276 0.077997 0.751922 0.086174 0.767240 0.094615 C0.763308 0.086173 0.759362 0.078135 0.755670 0.070749 C0.754573 0.068553 0.753370 0.066177 0.752120 0.063706Z";

const CLIP_STAR =
  "M1 0.5C0.867392 0.5 0.740215 0.447322 0.646447 0.353553C0.552678 0.259785 0.5 0.132608 0.5 0C0.5 0.132608 0.447322 0.259785 0.353553 0.353553C0.259785 0.447322 0.132608 0.5 0 0.5C0.132608 0.5 0.259785 0.552678 0.353553 0.646447C0.447322 0.740215 0.5 0.867392 0.5 1C0.5 0.867392 0.552678 0.740215 0.646447 0.646447C0.740215 0.552678 0.867392 0.5 1 0.5Z";

// ─── TEXT LINES ───────────────────────────────────────────────────────────
const LINES = [
  { text: "Every Friday", accent: false },
  { text: "we bake with love.", accent: true },
  { text: "Every Saturday", accent: false },
  { text: "we pour with care.", accent: true },
  { text: "Every Sunday", accent: false },
  { text: "You leave happy.", accent: true },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const arrow1Ref = useRef<SVGPathElement>(null);
  const arrow2Ref = useRef<SVGPathElement>(null);
  const img1Ref = useRef<HTMLElement>(null);
  const img2Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Word-by-word scroll reveal ───────────────────────────────
      const lineEls =
        linesRef.current?.querySelectorAll<HTMLDivElement>(".line");
      lineEls?.forEach((line) => {
        const words = line.querySelectorAll<HTMLSpanElement>(".word");
        gsap.fromTo(
          words,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            stagger: 0.045,
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      mm.add("(min-width: 768px)", () => {
        // ── Arrow 1 draw animation ────────────────────────────────
        if (arrow1Ref.current) {
          const len = arrow1Ref.current.getTotalLength();
          gsap.set(arrow1Ref.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(arrow1Ref.current, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "cubic-bezier(0.5, 0, 0.5, 1)",
            scrollTrigger: {
              trigger: arrow1Ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // ── Arrow 2 draw animation ────────────────────────────────
        if (arrow2Ref.current) {
          const len = arrow2Ref.current.getTotalLength();
          gsap.set(arrow2Ref.current, {
            strokeDasharray: len,
            strokeDashoffset: len,
          });
          gsap.to(arrow2Ref.current, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "cubic-bezier(0.5, 0, 0.5, 1)",
            delay: 0.2,
            scrollTrigger: {
              trigger: arrow2Ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }

        // ── Image 1 parallax ─────────────────────────────────────
        gsap.fromTo(
          img1Ref.current,
          { y: 60, opacity: 0, rotate: -6 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: img1Ref.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // ── Image 2 parallax ─────────────────────────────────────
        gsap.fromTo(
          img2Ref.current,
          { y: 80, opacity: 0, rotate: 8 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            scrollTrigger: {
              trigger: img2Ref.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // ── Continuous slow parallax scroll on images ────────────
        gsap.to(img1Ref.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(img2Ref.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-center justify-center px-5 md:px-8 lg:px-16 py-16 md:py-24 lg:py-32 overflow-hidden bg-[#FFF5EC]"
    >
      {/* ── Hidden clip path defs ──────────────────────────────────── */}
      <svg className="w-0 h-0 absolute" aria-hidden="true">
        <defs>
          <clipPath id="clip-blob" clipPathUnits="objectBoundingBox">
            <path d={CLIP_BLOB} />
          </clipPath>
          <clipPath id="clip-star" clipPathUnits="objectBoundingBox">
            <path d={CLIP_STAR} />
          </clipPath>
        </defs>
      </svg>

      {/* ── TEXT BLOCK ────────────────────────────────────────────── */}
      <div
        ref={linesRef}
        className="relative z-10 max-w-3xl w-full text-center"
      >
        {LINES.map((line, i) => (
          <div key={i} className="line overflow-hidden leading-none">
            {/*
              Each word wrapped in overflow-hidden span so the
              word slides up from below the clip — classic GSAP
              text reveal technique
            */}
            <span
              className={`inline-block text-[clamp(2rem,6vw,5rem)]
                ${
                  line.accent
                    ? "font-caprasimo text-[#E8470A]"
                    : "font-outfit font-bold text-[#1A1A1A]"
                }`}
            >
              {line.text.split(" ").map((word, wi) => (
                <span
                  key={wi}
                  className="word inline-block mr-[0.25em]"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>

      {/* ── ARROW 1 — points from "we bake" toward cake image ─────── */}
          <div
        className="absolute hidden md:block scale-y-[-1]"
        style={{ top: "25%", right: "15%", width: 227, height: 201 }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 127 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            ref={arrow1Ref}
            d={ARROW_1}
            stroke="#E8470A"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── ARROW 2 — points from "we pour" toward drink image ─────── */}
      <div
        className="absolute hidden md:block rotate-45"
        style={{ top: "40%", left: "15%", width: 180, height: 200 }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 96 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            ref={arrow2Ref}
            d={ARROW_2}
            stroke="#E8470A"
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── IMAGE 1 — cake, blob clip, top right ──────────────────── */}
      <figure
        ref={img2Ref}
        className="absolute hidden md:block"
        style={{
          top: "50%",
          right: "3%",
          width: "clamp(160px, 18vw, 280px)",
          height: "clamp(160px, 18vw, 280px)",
          clipPath: "url(#clip-blob)",
          willChange: "transform",
        }}
        aria-label="Tee's Treats cake"
      >
        <Image
          src="https://instagram.famd5-4.fna.fbcdn.net/v/t51.82787-15/587815656_18088280603479699_5905546330934307045_n.jpg?stp=dst-jpegr_e35_p640x640_sh2.08_tt6&_nc_cat=111&ig_cache_key=Mzc4MDEyODkzNTk5MjkxODExOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5oZHIuQzMifQ%3D%3D&_nc_ohc=fgt8pa5DpT4Q7kNvwEiOvPf&_nc_oc=AdppEg0IuiSgLGnwUJRQOMBVF_Ni2-bOaY-NpW5NELRDvfonecO0vecmm4jajfdnAIm7hF7q9AHAqsT_quOIxOHQ&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&se=-1&_nc_ht=instagram.famd5-4.fna&_nc_gid=sjsZ6HM0GEpBYKSWXvhELw&_nc_ss=7a22e&oh=00_Af7IzvOOBVAdVqIZ_X97t6YcDhClXNPZYVFHym6ZVe4K0A&oe=69FCB409"
          alt="A custom cake from Tee's Treats"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 768px) 280px, 0px"
        />
      </figure>

      {/* ── IMAGE 2 — drink, star clip, bottom left ───────────────── */}
      <figure
        ref={img1Ref}
        className="absolute hidden md:block"
        style={{
          top: "8%",
          left: "3%",
          width: "clamp(240px, 26vw, 340px)",
          height: "clamp(240px, 26vw, 340px)",
          clipPath: "url(#clip-star)",
          willChange: "transform",
        }}
        aria-label="Tee's Treats drink"
      >
        <Image
          src="https://instagram.famd5-3.fna.fbcdn.net/v/t51.82787-15/649171597_18097867253479699_6458265785197251226_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzg0NzY0NjY4MDU0Mzk3MzM4Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=Ll01LbdS8hcQ7kNvwEFhPph&_nc_oc=AdoNqgHS-ancPzpZjoR-WbQYzK1_U1WBCCyMYuDFP9FOABB3-IesvQsfSTNwsVWEA2DjYPmo1W35cw2WHEd6Ic7F&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.famd5-3.fna&_nc_gid=AAns1u7se4GUYS5PyKvHtQ&_nc_ss=7a22e&oh=00_Af73h_vq8BXF2efLuz1nsn6cJ2CA1KBQjxBE3BAuex9Cxw&oe=69FCCDE9"
          alt="A specialty coffee drink from Tee's Treats"
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 768px) 340px, 0px"
        />
      </figure>
    </section>
  );
}
