'use client';

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';

interface CTAButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function CTAButton({ href, label, className = '' }: CTAButtonProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const arrowPillRef = useRef<HTMLSpanElement>(null);
  const textPillRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  const onMouseEnter = () => {
    const arrowPill = arrowPillRef.current;
    const textPill = textPillRef.current;
    const arrow = arrowRef.current;
    if (!arrowPill || !textPill || !arrow) return;

    const arrowW = arrowPill.offsetWidth;
    const textW = textPill.offsetWidth;

    gsap.fromTo(
      arrowPill,
      { x: 0, scale: 0 },
      { x: textW, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }
    );

    gsap.to(textPill, {
      x: -arrowW,
      rotate: -5,
      duration: 0.45,
      ease: 'back.out(1.4)',
    });
  };

  const onMouseLeave = () => {
    const arrowPill = arrowPillRef.current;
    const textPill = textPillRef.current;
    const arrow = arrowRef.current;
    if (!arrowPill || !textPill || !arrow) return;

    gsap.to(arrowPill, {
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.4)',
    });

    gsap.to(textPill, {
      x: 0,
      rotate: 0,
      duration: 0.4,
      ease: 'back.out(1.4)',
    });

    gsap.to(arrow, {
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <Link
      ref={wrapperRef}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex w-fit items-center ${className}`}
    >
      <span
        ref={arrowPillRef}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-primary"
      >
        <svg
          ref={arrowRef}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="#FFF5EC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        ref={textPillRef}
        className="inline-flex h-11 items-center rounded-full bg-orange-primary px-5 font-outfit text-[clamp(0.75rem,2.6vw,0.85rem)] font-semibold uppercase tracking-[1px] text-cream"
      >
        {label}
      </span>
    </Link>
  );
}
