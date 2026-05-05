"use client";

import Link from "next/link";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "../ui/CTAButton";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "/",           label: "Home" },
  { href: "/menu",       label: "Menu" },
  { href: "/find-us",    label: "Find Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const SOCIALS = [
  {
    href: "https://www.instagram.com/teestreatsrutherglen/",
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008"/>
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/teestreatsrutherglen",
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647"/>
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@teestreatsrutherglen",
    label: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07"/>
      </svg>
    ),
  },
];

interface HoverFillLinkProps {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  fillClassName?: string;
}

interface HoverState {
  x: number;
  y: number;
  size: number;
}

function HoverFillLink({
  href,
  className,
  children,
  ariaLabel,
  target,
  rel,
  fillClassName = "bg-orange-hover",
}: HoverFillLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverState, setHoverState] = useState<HoverState>({
    x: 0,
    y: 0,
    size: 0,
  });

  const updateHoverState = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const distances = [
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y),
    ];

    setHoverState({
      x,
      y,
      size: Math.ceil(Math.max(...distances) * 2),
    });
  };

  const fillStyle: CSSProperties = {
    width: hoverState.size,
    height: hoverState.size,
    left: hoverState.x,
    top: hoverState.y,
    transform: isHovered
      ? "translate(-50%, -50%) scale(1)"
      : "translate(-50%, -50%) scale(0)",
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseEnter={(event) => {
        updateHoverState(event);
        setIsHovered(true);
      }}
      onMouseLeave={(event) => {
        updateHoverState(event);
        setIsHovered(false);
      }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full transition-transform duration-300 ease-out ${fillClassName}`}
        style={fillStyle}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

export default function Navbar() {
  const navRef     = useRef<HTMLElement>(null);
  const lastY      = useRef(0);
  const hidden     = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Entrance animation ─────────────────────────────────────────
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });

      // ── Hide on scroll down, show on scroll up ─────────────────────
      // Using RAF + scroll position delta — more reliable than
      // ScrollTrigger for this specific pattern because we need
      // to track direction continuously, not at trigger points
      const onScroll = () => {
        const currentY = window.scrollY;
        const delta    = currentY - lastY.current;

        // Only trigger after scrolling past 120px from top
        // Prevents hiding on the initial page load scroll
        if (currentY < 120) {
          if (hidden.current) {
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
            });
            hidden.current = false;
          }
          lastY.current = currentY;
          return;
        }

        if (delta > 4 && !hidden.current) {
          // Scrolling DOWN — hide navbar
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          });
          hidden.current = true;
        } else if (delta < -4 && hidden.current) {
          // Scrolling UP — show navbar
          gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          });
          hidden.current = false;
        }

        lastY.current = currentY;
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);

    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 h-14 md:h-[72px]"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16 h-full flex items-center justify-between">

        {/* ── LEFT — Social icons ─────────────────────────────────────
            Each icon is a standalone circle pill with frosted bg.
            Readable on any background color because it has its own
            contained surface — no navbar bg needed.
        ─────────────────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-2">
          {SOCIALS.map((s) => (
            <HoverFillLink
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              ariaLabel={s.label}
              fillClassName="bg-orange-hover"
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-chalk/40 backdrop-blur-md
                border border-cream/15  
                text-cream
                transition-colors duration-200 shadow-[2px_2px_1px_rgba(0,0,0,0.4)]
              "
            >
              {s.icon}
            </HoverFillLink>
          ))}
        </div>

        {/* ── CENTER — Nav links ──────────────────────────────────────
            Links sit inside a single frosted pill container.
            The pill has its own background so it floats above
            any section color without needing the navbar to have a bg.
        ─────────────────────────────────────────────────────────── */}
        <div
          className="
            hidden md:flex items-center gap-1
            bg-chalk/40 backdrop-blur-md
            border border-[#FFF5EC]/15
            rounded-full p-1  shadow-[2px_2px_1px_rgba(0,0,0,0.4)]
          "
        >
          {NAV_LINKS.map((link) => (
            <HoverFillLink
              key={link.href}
              href={link.href}
              fillClassName="bg-orange-hover"
              className="
                font-outfit text-[clamp(0.85rem,1.6vw,0.95rem)] font-medium tracking-[0.3px]
                text-cream px-4 py-1.5 rounded-full
                transition-colors duration-200 
              "
            >
              {link.label}
            </HoverFillLink>
          ))}
        </div>

        {/* ── RIGHT — CTA Button ──────────────────────────────────── */}
        <div className="hidden md:block">
          <CTAButton href="/contact-us" label="Contact Us" />
        </div>

        {/* ── MOBILE — Just the CTA ───────────────────────────────── */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link
            href="/"
              className="font-caprasimo text-[#E8470A] text-[clamp(1.25rem,3.6vw,1.75rem)]"
          >
            Tee&apos;s Treats
          </Link>
          <CTAButton href="/contact-us" label="Contact Us" />
        </div>

      </div>
    </nav>
  );
}
