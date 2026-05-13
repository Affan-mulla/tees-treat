"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  getLogoMarkup,
  HERO_LOGO_TARGET_SELECTOR,
  prepareLogoPaths,
} from "@/lib/logoAnimation";

interface PreloaderProps {
  onComplete: () => void;
}

function waitForHeroLogoTarget(shouldContinue: () => boolean, timeoutMs = 1200) {
  return new Promise<HTMLElement | null>((resolve) => {
    const timeoutId = window.setTimeout(() => {
      resolve(null);
    }, timeoutMs);

    const findTarget = () => {
      if (!shouldContinue()) {
        window.clearTimeout(timeoutId);
        return;
      }

      const target = document.querySelector<HTMLElement>(HERO_LOGO_TARGET_SELECTOR);
      const rect = target?.getBoundingClientRect();

      if (target && rect && rect.width > 0 && rect.height > 0) {
        window.clearTimeout(timeoutId);
        resolve(target);
        return;
      }

      requestAnimationFrame(findTarget);
    };

    findTarget();
  });
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const [logoMarkup, setLogoMarkup] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    getLogoMarkup()
      .then((markup) => {
        if (alive) {
          setLogoMarkup(markup);
        }
      })
      .catch(() => null);

    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!logoMarkup) return;

    let cancelled = false;
    let rafId = 0;
    let timeline: gsap.core.Timeline | null = null;
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const logoWrap = logoWrapRef.current;

    const run = async () => {
      const target = await waitForHeroLogoTarget(() => !cancelled);

      if (cancelled || !container || !overlay || !logoWrap) {
        return;
      }

      const logoSvg = logoWrap.querySelector("svg");
      if (!logoSvg) return;

      const paths = prepareLogoPaths(logoSvg);
      if (!paths.length) return;

      gsap.set(overlay, { yPercent: 0 });
      gsap.set(logoWrap, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "center center",
      });

      const startRect = logoWrapRef.current?.getBoundingClientRect() as DOMRect ;
      const startCenterX = startRect.left + startRect.width / 2;
      const startCenterY = startRect.top + startRect.height / 2;

      timeline = gsap.timeline({
        onComplete: () => {
          if (container) {
            container.style.display = "none";
          }
          onComplete();
        },
      });

      timeline.to(paths, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: { each: 0.006, from: "random" },
      });

      timeline.to(
        paths,
        {
          fill: (_index: number, targetPath: Element) =>
            (targetPath as SVGPathElement).dataset.fill || "#1A1A1A",
          stroke: "transparent",
          duration: 0.5,
          stagger: { each: 0.003, from: "random" },
        },
        "-=0.75",
      );

      timeline.to(
        overlay,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "reveal",
      );

      if (target) {
        const targetRect = target.getBoundingClientRect();
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        timeline.to(
          logoWrap,
          {
            x: targetCenterX - startCenterX,
            y: targetCenterY - startCenterY,
            scale: targetRect.width / startRect.width,
            duration: 1,
            ease: "expo.inOut",
          },
          "reveal+=0.04",
        );
      } else {
        timeline.to(
          logoWrap,
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          "reveal+=0.08",
        );
      }
    };

    rafId = requestAnimationFrame(() => {
      void run();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      timeline?.kill();
      gsap.killTweensOf([overlay, logoWrap]);
    };
  }, [logoMarkup, onComplete]);

  return (
    <div
      ref={containerRef}
      data-preloader
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <div
        ref={overlayRef}
        data-preloader-overlay
        className="absolute inset-0 bg-chalk"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={logoWrapRef}
          className="aspect-[465/400] w-[clamp(260px,46vw,420px)] [&>svg]:h-auto [&>svg]:w-full"
          style={{ opacity: 0 }}
          dangerouslySetInnerHTML={logoMarkup ? { __html: logoMarkup } : undefined}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
