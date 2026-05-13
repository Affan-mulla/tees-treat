"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "@/components/ui/CTAButton";
import HoverFillLink from "../HoverFillLink";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/find-us", label: "Find Us" },
  { href: "/contact-us", label: "Contact Us" },
];

const HOURS = [
  { day: "Friday", time: "9am - 5pm" },
  { day: "Saturday", time: "9am - 5pm" },
  { day: "Sunday", time: "10am - 4pm" },
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
    href: "https://www.facebook.com/profile.php?id=100053975053215",
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
export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>("[data-footer-reveal]");

      gsap.fromTo(
        revealItems,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: revealRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 28, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top 98%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-chalk text-cream "
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <svg className="h-full w-full">
          <filter id="footer-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-grain)" />
        </svg>
      </div>

      <div ref={revealRef} className="relative z-10 ">
        <div className="grid gap-px overflow-hidden border border-cream/12 bg-cream/12 lg:grid-cols-[1.1fr_0.9fr]">
          <section data-footer-reveal className="bg-chalk p-6 md:p-10 lg:p-12">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-orange-primary">
              Coffee house and bakeshop
            </p>

            <h2 className="mt-6 max-w-4xl font-caprasimo text-5xl leading-[0.95] text-cream md:text-7xl lg:text-8xl">
              Come for coffee. Leave with cake.
            </h2>

            <p className="mt-6 max-w-xl font-dmsans text-lg leading-[1.55] text-cream/62 md:text-xl">
              Small-batch treats from Rutherglen, open three days a week and
              worth planning around.
            </p>

            <div className="mt-10">
              <CTAButton href="/contact-us" label="Order Enquiry" />
            </div>
          </section>

          <section className="grid gap-px bg-cream/12 md:grid-cols-2 lg:grid-cols-1">
            <div data-footer-reveal className="bg-chalk p-6 md:p-8">
              <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-cream/38">
                Visit
              </p>
              <address className="mt-5 not-italic font-caprasimo text-3xl leading-[1.05] text-cream md:text-4xl">
                90 Stonelaw Road
                <br />
                Rutherglen, Glasgow
              </address>
            </div>

            <div data-footer-reveal className="bg-chalk p-6 md:p-8">
              <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-cream/38">
                Opening Hours
              </p>

              <div className="mt-5 grid gap-3">
                {HOURS.map((item) => (
                  <div
                    key={item.day}
                    className="flex min-h-11 items-center justify-between border-b border-cream/10 pb-3"
                  >
                    <span className="font-outfit text-sm font-semibold uppercase tracking-[1px] text-cream">
                      {item.day}
                    </span>
                    <span className="font-dmsans text-sm text-cream/60">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-px border-x border-b border-cream/12 bg-cream/12 md:grid-cols-2">
          <nav data-footer-reveal className="bg-chalk p-6 md:p-8" aria-label="Footer navigation">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-cream/38">
              Pages
            </p>
            <div className="mt-5 grid gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-11 items-center justify-between border-b border-cream/10 font-caprasimo text-2xl leading-none text-cream transition-colors duration-200 hover:text-orange-primary"
                >
                  {link.label}
                  <span className="font-outfit text-xs text-orange-primary">Go</span>
                </Link>
              ))}
            </div>
          </nav>

          <div data-footer-reveal className="bg-chalk p-6 md:p-8">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[3px] text-cream/38">
              Social
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {SOCIALS.map((social) => (
                <HoverFillLink
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  fillClassName="bg-orange-primary"
                  className="flex items-center  gap-2 rounded-full border border-cream/10 px-4 py-2 text-sm font-medium text-cream transition-colors duration-200"
                >
                  <div className="flex gap-2 items-center justify-center">
                    
                  <span className="text-lg">{social.icon}</span>
                  <p className="">{social.label}</p>
                  </div>
                </HoverFillLink>
              ))}
            </div>
          </div>
        </div>

        <div
          data-footer-reveal
          className="flex gap-4 p-1 md:items-center md:justify-between"
        >
          <p className="font-outfit text-[8px] font-semibold uppercase tracking-[2px] text-cream/38">
            © {new Date().getFullYear()} Tee&apos;s Treats. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
