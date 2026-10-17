"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/motion/CountUp";

const bars = [
  { year: "2021", height: 36, color: "linear-gradient(180deg, #7ec8f0 0%, #4EB6EE 100%)" },
  { year: "2022", height: 50, color: "linear-gradient(180deg, #6bbef0 0%, #3aa8e4 100%)" },
  { year: "2023", height: 66, color: "linear-gradient(180deg, #4EB6EE 0%, #2AA6E8 100%)" },
  { year: "2024", height: 82, color: "linear-gradient(180deg, #3aa8e4 0%, #12499D 100%)" },
  { year: "2025", height: 96, color: "linear-gradient(180deg, #12499D 0%, #0C2F66 100%)" },
] as const;

const CURVE_LIFT = 4;
const curvePoints = bars.map((bar, i) => ({
  x: 10 + i * 20,
  y: 100 - bar.height - CURVE_LIFT,
}));

function curvePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  const [first, ...rest] = points;
  let d = `M ${first.x} ${first.y}`;
  for (let i = 0; i < rest.length; i++) {
    const prev = i === 0 ? first : rest[i - 1];
    const curr = rest[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function GrowthChart() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const path = curvePath(curvePoints);
  const tip = curvePoints[curvePoints.length - 1];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full max-w-[520px] lg:ml-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[1.05rem] font-medium text-[#1a2433]">Analytics</p>
          <p className="mt-2 text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.04em] text-[#4EB6EE]">
            <CountUp end={40} prefix="+" suffix="%" duration={1700} />
          </p>
          <p className="mt-2 text-[0.95rem] text-[#5b6b7f]">Grow Since Per Year</p>
        </div>
        <p className="pt-1 text-[0.95rem] text-[#4EB6EE]">
          Achievement{" "}
          <CountUp end={90} suffix="%" duration={1600} delay={120} />
        </p>
      </div>

      <div className="mt-8">
        <div className="relative h-[200px] sm:h-[220px]">
          <div className="absolute inset-0 flex items-end justify-between px-1">
            {bars.map((bar, index) => (
              <div
                key={bar.year}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-[0.7rem] rounded-full sm:w-[0.8rem]"
                  style={{
                    height: active ? `${bar.height}%` : "6%",
                    background: bar.color,
                    transition: `height 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                  }}
                />
              </div>
            ))}
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={path}
              fill="none"
              stroke="#4EB6EE"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{
                strokeDasharray: 180,
                strokeDashoffset: active ? 0 : 180,
                transition:
                  "stroke-dashoffset 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            />
          </svg>

          <span
            className="pointer-events-none absolute z-20 text-[#4EB6EE]"
            style={{
              left: `${tip.x}%`,
              top: `${tip.y}%`,
              transform: "translate(-10%, -90%) rotate(-28deg)",
              opacity: active ? 1 : 0,
              transition: "opacity 0.3s ease 1.55s",
            }}
            aria-hidden
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2 11.5 11.5 2.5l.2 5.2L7.8 12z" />
            </svg>
          </span>
        </div>

        <div className="mt-3 flex justify-between px-1">
          {bars.map((bar) => (
            <span
              key={bar.year}
              className="flex-1 text-center text-[0.85rem] font-medium text-[#4EB6EE]"
            >
              {bar.year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
