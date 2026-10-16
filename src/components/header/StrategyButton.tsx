import Link from "next/link";

type StrategyButtonProps = {
  href?: string;
  label?: string;
  className?: string;
  onClick?: () => void;
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={className}
      fill="none"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StrategyButton({
  href = "/contact",
  label = "Book a Strategy",
  className = "",
  onClick,
}: StrategyButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`bynk-cta ${className}`.trim()}
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <span className="bynk-cta__label">
        <span className="bynk-cta__label-track">
          <span className="bynk-cta__label-line">{label}</span>
          <span className="bynk-cta__label-line" aria-hidden>
            {label}
          </span>
        </span>
      </span>

      <span className="bynk-cta__arrow" aria-hidden>
        <span className="bynk-cta__arrow-fill" />
        <span className="bynk-cta__arrow-icons">
          <ArrowIcon className="bynk-cta__arrow-icon bynk-cta__arrow-icon--out" />
          <ArrowIcon className="bynk-cta__arrow-icon bynk-cta__arrow-icon--in" />
        </span>
      </span>
    </Link>
  );
}
