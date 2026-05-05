'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import Image from 'next/image';

interface SpinningCookieProps {
  className?: string;
}

export default function SpinningCookie({ className = '' }: SpinningCookieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const cookieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(Observer);

    let speed = 0.12;
    let targetSpeed = 0.12;
    let ringRotation = 0;
    let cookieRotation = 0;
    let observer: Observer | null = null;

    const update = () => {
      const delta = gsap.ticker.deltaRatio(60);
      speed += (targetSpeed - speed) * 0.08;
      ringRotation += speed * 1.15 * delta;
      cookieRotation += speed * 1.0 * delta;

      gsap.set(ringRef.current, {
        rotation: ringRotation,
        transformOrigin: '50% 50%',
      });
      gsap.set(cookieRef.current, {
        rotation: cookieRotation,
        transformOrigin: '50% 50%',
      });
    };

    const ctx = gsap.context(() => {
      observer = Observer.create({
        target: window,
        type: 'wheel,scroll,touch',
        onDown: (self) => {
          const boost = Math.min(Math.abs(self.velocityY) * 0.0012, 1.2);
          targetSpeed = 0.12 + boost;
        },
        onUp: (self) => {
          const boost = Math.min(Math.abs(self.velocityY) * 0.0012, 1.2);
          targetSpeed = -(0.12 + boost);
        },
        onStop: () => {
          targetSpeed = 0.12;
        },
      });

      gsap.ticker.add(update);
    }, containerRef);

    return () => {
      observer?.kill();
      gsap.ticker.remove(update);
      ctx.revert();
    };
  }, []);

  const ringText =
    'COFFEE & BAKESHOP · OPEN FRI SAT SUN · RUTHERGLEN · ';
  const ringTextRepeat = `${ringText}${ringText}`;

  return (
    <div
      ref={containerRef}
      className={`absolute left-0 bottom-0 z-20 ${className}`}
    >
      <div className="relative">
        <svg
          ref={ringRef}
          viewBox="0 0 300 300"
          className="h-[clamp(310px,40vw,280px)] w-[clamp(310px,40vw,280px)] md:h-[clamp(240px,32vw,380px)] md:w-[clamp(240px,32vw,380px)]"
          aria-hidden="true"
        >
          <defs>
            <path
              id="cookieTextPath"
              d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
            />
          </defs>
          <text
            className="font-outfit text-[clamp(1.1rem,3vw,1.4rem)] tracking-[3px]"
            fill="var(--color-chalk)"
          >
            <textPath href="#cookieTextPath" startOffset="0%">
              {ringTextRepeat}
            </textPath>
          </text>
        </svg>

        <div
          ref={cookieRef}
          className="absolute left-1/2 top-1/2 h-[clamp(400px,44vw,320px)] w-[clamp(400px,44vw,320px)] md:h-[clamp(300px,30vw,420px)] md:w-[clamp(300px,30vw,420px)] -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/cookie.png"
            alt="Tee's Treats cookie"
            fill
            sizes="(max-width: 768px) 280px, 420px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
