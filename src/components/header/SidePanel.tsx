"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { brand } from "@/lib/brand";

type SidePanelProps = {
  open: boolean;
  onClose: () => void;
  panelId: string;
};

function CloseIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 7.5h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M4.5 8.2 12 13.2l7.5-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function SidePanel({ open, onClose, panelId }: SidePanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[80] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-[#0b1220]/55 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close sidebar"
        onClick={onClose}
      />

      <aside
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="BYNK contact panel"
        className={`absolute top-0 right-0 flex h-full w-full max-w-[420px] flex-col bg-[#07111f] text-white shadow-[-24px_0_60px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        <div className="flex justify-end px-7 pt-7 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[0.3rem] border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pt-5 pb-10">
          <Link href="/" onClick={onClose} className="inline-block shrink-0" aria-label={brand.name}>
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={200}
              height={68}
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>

          <p className="mt-5 max-w-[32ch] text-[15px] leading-relaxed text-white/75">
            Strategic advisory for financial institutions and fintech companies
            navigating technology, innovation, and complex disputes.
          </p>

          <div className="mt-9">
            <h2 className="text-[1.35rem] font-bold tracking-[-0.02em] text-white">
              Contact Info:
            </h2>

            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-white">
                  <LocationIcon />
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-white">Address:</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/70">
                    {brand.contact.location}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-white">
                  <EmailIcon />
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-white">Email:</p>
                  <a
                    href={`mailto:${brand.contact.email}`}
                    className="mt-0.5 block text-sm leading-relaxed text-white/70 transition hover:text-[#69c1f0]"
                  >
                    {brand.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-white">
                  <InstagramIcon />
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-white">Instagram:</p>
                  <a
                    href={brand.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 block text-sm leading-relaxed text-white/70 transition hover:text-[#69c1f0]"
                  >
                    {brand.contact.instagram}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
