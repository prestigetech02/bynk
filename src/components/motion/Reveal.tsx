"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
};

const hiddenTransform: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate3d(0, 2.75rem, 0) scale(0.985)",
  down: "translate3d(0, -2.75rem, 0) scale(0.985)",
  left: "translate3d(2.5rem, 0, 0) scale(0.985)",
  right: "translate3d(-2.5rem, 0, 0) scale(0.985)",
  none: "translate3d(0, 0, 0) scale(0.99)",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 1100,
  from = "up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0, 0, 0) scale(1)" : hiddenTransform[from],
    filter: visible ? "blur(0)" : "blur(6px)",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionDelay: visible ? `${delay}ms` : "0ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "opacity, transform, filter",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
