import Link from "next/link";
import { CSSProperties, ReactNode, useState } from "react";


interface HoverState {
  x: number;
  y: number;
  size: number;
}

interface HoverFillLinkProps {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
  target?: string;
  rel?: string;
  fillClassName?: string;
}

export default function HoverFillLink({
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