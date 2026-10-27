const words = ["IT", "STRATEGY", "LEGAL", "AI", "CORPORATE"] as const;

function BurstIcon() {
  const spokes = 20;
  const cx = 24;
  const cy = 24;
  const inner = 2.4;
  const outer = 12;
  const halfWidth = 0.28;
  const fmt = (value: number) => value.toFixed(4);

  return (
    <svg
      className="bynk-marquee__burst"
      width="32"
      height="32"
      viewBox="0 0 48 48"
      aria-hidden
    >
      {Array.from({ length: spokes }, (_, i) => {
        const angle = ((i * 360) / spokes - 90) * (Math.PI / 180);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const tipX = cx + cos * outer;
        const tipY = cy + sin * outer;
        const baseX = cx + cos * inner;
        const baseY = cy + sin * inner;
        const px = -sin * halfWidth;
        const py = cos * halfWidth;

        return (
          <polygon
            key={i}
            points={`${fmt(tipX)},${fmt(tipY)} ${fmt(baseX + px)},${fmt(baseY + py)} ${fmt(baseX - px)},${fmt(baseY - py)}`}
            fill="currentColor"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="1.35" fill="currentColor" />
    </svg>
  );
}

function MarqueeItem({ word, tone }: { word: string; tone: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-5 sm:gap-6">
      <span
        className={
          tone === "light"
            ? "bynk-marquee__word bynk-marquee__word--light"
            : "bynk-marquee__word bynk-marquee__word--dark"
        }
      >
        {word}
      </span>
      <span className="bynk-marquee__burst-wrap">
        <BurstIcon />
      </span>
    </span>
  );
}

type WordMarqueeProps = {
  /** Homepage band uses dual-tone words; footer strip is all-white. */
  variant?: "home" | "footer";
};

export function WordMarquee({ variant = "home" }: WordMarqueeProps) {
  const sequence = [...words, ...words];

  return (
    <div
      className={
        variant === "footer"
          ? "bynk-marquee bynk-marquee--footer overflow-hidden py-6"
          : "bynk-marquee bynk-marquee--home overflow-hidden py-14 sm:py-20"
      }
      aria-label="Practice focus areas"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="bynk-marquee__track flex w-max items-center">
        {sequence.map((word, index) => (
          <MarqueeItem
            key={`${word}-${index}`}
            word={word}
            tone={index % 2 === 0 ? "light" : "dark"}
          />
        ))}
      </div>
    </div>
  );
}
