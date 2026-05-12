"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CTAButton from "../ui/CTAButton";
import HoverFillLink from "../HoverFillLink";
import useMobile from "@/hooks/useMobile";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/find-us", label: "Find Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const SOCIALS = [
  {
    href: "https://www.instagram.com/teestreatsrutherglen/",
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008" />
      </svg>
    ),
  },
  {
    href: "https://www.facebook.com/teestreatsrutherglen",
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978c.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647" />
      </svg>
    ),
  },
  {
    href: "https://www.tiktok.com/@teestreatsrutherglen",
    label: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const isMobile = useMobile();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const hidden = useRef(true);
  const menuOpenRef = useRef(false);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.3,
      });

      const onScroll = () => {
        if (!navRef.current) return;

        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        if (menuOpenRef.current) {
          if (hidden.current) {
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power3.out",
            });
            hidden.current = false;
          }

          lastY.current = currentY;
          return;
        }

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
          gsap.to(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          });
          hidden.current = true;
        } else if (delta < -4 && hidden.current) {
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

      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }, navRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    const mobilePanel = mobilePanelRef.current;

    if (!mobileMenu || !mobilePanel) return;

    const select = gsap.utils.selector(mobileMenu);

    gsap.set(mobileMenu, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(mobilePanel, {
      clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)",
      yPercent: -4,
    });
    gsap.set(select("[data-mobile-menu-fade]"), { opacity: 0 });
    gsap.set(select("[data-mobile-menu-item]"), { opacity: 0, y: 32, scale: 0.98 });
    gsap.set(select("[data-mobile-menu-pill]"), { opacity: 0, y: 18, scale: 0.96 });
  }, []);

  useEffect(() => {
    menuOpenRef.current = isMobileMenuOpen;

    const mobileMenu = mobileMenuRef.current;
    const mobilePanel = mobilePanelRef.current;

    if (!mobileMenu || !mobilePanel) return;

    const select = gsap.utils.selector(mobileMenu);

    menuTimelineRef.current?.kill();

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      if (hidden.current && navRef.current) {
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
        });
        hidden.current = false;
      }

      const tl = gsap.timeline();

      tl.set(mobileMenu, { autoAlpha: 1, pointerEvents: "auto" })
        .to(mobileMenu.querySelector("[data-mobile-menu-backdrop]"), {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(
          mobilePanel,
          {
            clipPath: "inset(0 0 0% 0 round 0)",
            yPercent: 0,
            duration: 0.65,
            ease: "power4.inOut",
          },
          0,
        )
        .to(
          select("[data-mobile-menu-fade]"),
          {
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.16,
        )
        .to(
          select("[data-mobile-menu-item]"),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.22,
        )
        .to(
          select("[data-mobile-menu-pill]"),
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.38,
        );

      menuTimelineRef.current = tl;
      return;
    }

    document.body.style.overflow = "";

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(mobileMenu, { autoAlpha: 0, pointerEvents: "none" });
      },
    });

    tl.to(select("[data-mobile-menu-pill]"), {
      opacity: 0,
      y: 12,
      scale: 0.96,
      duration: 0.2,
      stagger: { each: 0.03, from: "end" },
      ease: "power2.in",
    })
      .to(
        select("[data-mobile-menu-item]"),
        {
          opacity: 0,
          y: 18,
          scale: 0.98,
          duration: 0.22,
          stagger: { each: 0.04, from: "end" },
          ease: "power2.in",
        },
        0,
      )
      .to(
        select("[data-mobile-menu-fade]"),
        {
          opacity: 0,
          duration: 0.18,
          ease: "power1.in",
        },
        0.02,
      )
      .to(
        mobilePanel,
        {
          clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)",
          yPercent: -4,
          duration: 0.42,
          ease: "power4.inOut",
        },
        0.08,
      )
      .to(
        mobileMenu.querySelector("[data-mobile-menu-backdrop]"),
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        0.08,
      );

    menuTimelineRef.current = tl;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 h-14 w-full md:h-[72px]"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-5 md:px-8 lg:px-16">
        {!isMobile && (
          <>
            <div className="hidden items-center gap-2 md:flex">
              {SOCIALS.map((social) => (
                <HoverFillLink
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel={social.label}
                  fillClassName="bg-orange-primary"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-chalk/40 text-cream shadow-[2px_2px_1px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-200"
                >
                  {social.icon}
                </HoverFillLink>
              ))}
            </div>

            <div className="hidden items-center gap-1 rounded-full border border-[#FFF5EC]/15 bg-chalk/40 p-1 shadow-[2px_2px_1px_rgba(0,0,0,0.4)] backdrop-blur-md md:flex">
              {NAV_LINKS.map((link) => (
                <HoverFillLink
                  key={link.href}
                  href={link.href}
                  fillClassName="bg-orange-primary"
                  className="rounded-full px-4 py-1.5 font-outfit text-[clamp(0.85rem,1.6vw,0.95rem)] font-medium tracking-[0.3px] text-cream transition-colors duration-200"
                >
                  {link.label}
                </HoverFillLink>
              ))}
            </div>

            <div className="hidden md:block">
              <CTAButton href="/contact-us" label="Contact Us" />
            </div>
          </>
        )}

        {isMobile && (
          <div className="relative z-40 flex w-full items-center justify-between md:hidden">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-caprasimo text-[clamp(1.25rem,3.6vw,1.75rem)] text-orange-primary"
          >
            Tee&apos;s Treats
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/contact-us"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-11 items-center rounded-full bg-orange-primary px-4 font-outfit text-[0.68rem] font-semibold uppercase tracking-[1.8px] text-cream shadow-[0_10px_24px_rgba(232,71,10,0.22)] transition-transform duration-300 active:scale-[0.98]"
            >
              Contact
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                isMobileMenuOpen
                  ? "border-orange-primary bg-orange-primary text-cream shadow-[0_10px_30px_rgba(232,71,10,0.28)]"
                  : "border-chalk/10 bg-white/80 text-chalk shadow-[0_8px_24px_rgba(26,26,26,0.1)] backdrop-blur-md"
              }`}
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-4 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 top-[1px] h-[1.5px] w-4 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "translate-y-[6px] rotate-45 bg-cream" : "bg-current"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-[1.5px] w-4 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100 bg-current"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[13px] h-[1.5px] w-4 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-translate-y-[6px] -rotate-45 bg-cream" : "bg-current"
                  }`}
                />
              </span>
            </button>
          </div>
          </div>
        )}
      </div>

      {isMobile && (
        <div
          ref={mobileMenuRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-svh opacity-0 md:hidden"
          aria-hidden={!isMobileMenuOpen}
        >
        <div
          data-mobile-menu-backdrop
          className="absolute inset-0 bg-chalk/25 opacity-0 backdrop-blur-sm"
        />

        <div
          id="mobile-menu"
          ref={mobilePanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="absolute inset-0 min-h-svh overflow-hidden bg-cream text-chalk"
          style={{ clipPath: "inset(0 0 100% 0 round 0 0 2rem 2rem)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,71,10,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(242,196,206,0.28),transparent_30%)]" />
          <div
            className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/686c09a33211842a0ac0183d/68b0b1e2ae528702c898a058_pattern.png')] bg-blend-color-burn opacity-50"
            style={{ mixBlendMode: "multiply" }}
          />

          <div className="relative flex h-full flex-col px-2 pb-8 pt-20">
            <div
              data-mobile-menu-fade
              className="flex items-center justify-between border-b border-chalk/10 pb-5"
            >
              <div>
                <p className="font-outfit text-[0.65rem] font-semibold uppercase tracking-[3px] text-orange-primary">
                  Navigate
                </p>
                <p className="mt-1 font-outfit text-sm leading-none text-chalk">
                  Explore the menu, find us, or get in touch.
                </p>
              </div>

            </div>

            <div className="flex flex-1 flex-col justify-between pt-6">
              <nav aria-label="Mobile primary navigation" className="grid gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-mobile-menu-item
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-end justify-between transition-transform duration-300 active:scale-[0.98]"
                  >
                    <div>
                      <span className="mt-2 block font-caprasimo text-[clamp(1rem,8vw,3.8rem)] leading-[0.9] text-chalk transition-colors duration-300 group-hover:text-orange-primary">
                        {link.label}
                      </span>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-primary text-cream transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7V17"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="grid gap-4 pt-8">
                <div
                  data-mobile-menu-pill
                  className="rounded-[1.75rem] border border-chalk/10 bg-white/65 p-4 shadow-[0_18px_34px_rgba(26,26,26,0.08)] backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-outfit text-[0.65rem] font-semibold uppercase tracking-[3px] text-chalk/38">
                        Social
                      </p>
                      <p className="mt-2 font-dmsans text-sm text-chalk/60">
                        Follow the latest bakes, cakes, and shop updates.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {SOCIALS.map((social) => (
                        <HoverFillLink
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          ariaLabel={social.label}
                          fillClassName="bg-orange-primary"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-chalk/10 bg-cream text-chalk shadow-[0_10px_22px_rgba(26,26,26,0.06)] transition-transform duration-300 hover:-translate-y-1"
                        >
                          {social.icon}
                        </HoverFillLink>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  data-mobile-menu-pill
                  className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-chalk/10 bg-chalk px-5 py-4 text-cream shadow-[0_18px_34px_rgba(26,26,26,0.12)]"
                >
                  <div>
                    <p className="font-outfit text-[0.65rem] font-semibold uppercase tracking-[3px] text-cream/40">
                      Visit
                    </p>
                    <p className="mt-2 font-caprasimo text-2xl leading-none">90 Stonelaw Road</p>
                  </div>
                  <p className="max-w-[7rem] text-right font-dmsans text-sm leading-5 text-cream/62">
                    Rutherglen, Glasgow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </nav>
  );
}
