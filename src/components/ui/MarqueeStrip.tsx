'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

interface MarqueeStripProps {
  content: string;
  baseSpeed?: number;
  rotateDeg?: number;
  bgColor?: string;
  textColor?: string;
}

const SEPARATOR = '\u00B7';

export default function MarqueeStrip({
  content,
  baseSpeed = 1,
  rotateDeg = -2,
  bgColor = '#E8470A',
  textColor = '#FFF5EC',
}: MarqueeStripProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const copy1Ref = useRef<HTMLDivElement>(null);
  const copy2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const copy1 = copy1Ref.current;
    const copy2 = copy2Ref.current;
    if (!copy1 || !copy2) return;

    const ctx = gsap.context(() => {
      const speed = baseSpeed * 100;
      let direction = -1;
      let boost = 0;

      gsap.set(copy1, { x: 0 });
      gsap.set(copy2, { x: copy1.offsetWidth });

      const wrap = gsap.utils.wrap(-copy1.offsetWidth, copy1.offsetWidth);

      const update = (_time: number, delta: number) => {
        const move = (speed + boost) * direction * (delta / 1000);

        boost *= 0.95;

        gsap.set([copy1, copy2], {
          x: (_i, target) => wrap((gsap.getProperty(target, 'x') as number) + move),
        });
      };

      gsap.ticker.add(update);

      const observer = Observer.create({
        target: window,
        type: 'wheel,touch,scroll',
        onUp: (self) => {
          direction = 1;
          boost = Math.min(Math.abs(self.velocityY) * 0.3, 300);
        },
        onDown: (self) => {
          direction = -1;
          boost = Math.min(Math.abs(self.velocityY) * 0.3, 300);
        },
        onStop: () => {
          boost = 0;
        },
      });

      const handleResize = () => {
        const width = copy1.offsetWidth;
        gsap.set(copy2, { x: width });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        gsap.ticker.remove(update);
        observer.kill();
        window.removeEventListener('resize', handleResize);
      };
    }, wrapperRef);

    return () => ctx.revert();
  }, [baseSpeed]);

  const renderItems = () =>
    content.split(SEPARATOR).map((part, i, arr) => (
      <span key={i} className="inline-flex items-center gap-4">
        <span className="whitespace-nowrap">{part.trim()}</span>
        {i < arr.length - 1 && (
          <span style={{ color: '#F2C4CE', fontSize: '1.1em' }}>{SEPARATOR}</span>
        )}
      </span>
    ));

  const buildContent = () => {
    const base = renderItems();

    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="flex items-center gap-6 pr-6">
            {base}
          </span>
        ))}
      </>
    );
  };

  return (
    <div
      ref={wrapperRef}
      className="absolute left-0 w-screen overflow-hidden py-4"
      style={{
        backgroundColor: bgColor,
        transform: `rotate(${rotateDeg}deg) scaleX(1.12)`,
        top: '35%',
        zIndex: 0,
      }}
    >
      <div
        className="relative flex"
        style={{ color: textColor, willChange: 'transform', height: '2em' }}
      >
        <div
          ref={copy1Ref}
          className="absolute top-0 left-0 flex items-center whitespace-nowrap font-caprasimo text-[clamp(0.85rem,3vw,1.125rem)]"
        >
          {buildContent()}
        </div>

        <div
          ref={copy2Ref}
          aria-hidden="true"
          className="absolute top-0 left-0 flex items-center whitespace-nowrap font-caprasimo text-[clamp(0.85rem,3vw,1.125rem)]"
        >
          {buildContent()}
        </div>
      </div>
    </div>
  );
}
