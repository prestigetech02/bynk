"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { brand } from "@/lib/brand";
import { SidePanel } from "./SidePanel";
import { StrategyButton } from "./StrategyButton";
import { navItems, type NavItem } from "./nav";

const MEGA_WIDTH = 920;
const VIEWPORT_MARGIN = 20;
const PANEL_GAP = 14;
const CLOSE_DELAY_MS = 120;

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className={`h-2 w-2 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondGridIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2.8 14.8 5.6 12 8.4 9.2 5.6 12 2.8Z" />
      <path d="M5.6 9.2 8.4 12 5.6 14.8 2.8 12 5.6 9.2Z" />
      <path d="M18.4 9.2 21.2 12 18.4 14.8 15.6 12 18.4 9.2Z" />
      <path d="M12 15.6 14.8 18.4 12 21.2 9.2 18.4 12 15.6Z" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7H20M4 12H20M4 17H20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

/** Prefer centering under the trigger; bias left/right near edges; always clamp in-viewport. */
function getMegaPosition(trigger: DOMRect): CSSProperties {
  const width = Math.min(MEGA_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  const maxLeft = window.innerWidth - width - VIEWPORT_MARGIN;
  const triggerCenter = trigger.left + trigger.width / 2;
  const leftRatio = triggerCenter / window.innerWidth;

  let left: number;
  if (leftRatio < 0.34) {
    left = trigger.left;
  } else if (leftRatio > 0.66) {
    left = trigger.right - width;
  } else {
    left = triggerCenter - width / 2;
  }

  left = Math.min(Math.max(left, VIEWPORT_MARGIN), maxLeft);

  return {
    position: "fixed",
    top: trigger.bottom + PANEL_GAP,
    left,
    width,
  };
}

function MegaPanelContent({ item }: { item: NavItem }) {
  if (!item.mega) return null;
  const { links, image } = item.mega;

  return (
    <div className="overflow-hidden rounded-md border border-bynk-border bg-white shadow-[0_28px_70px_-24px_rgba(0,0,0,0.55)]">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-1 p-5 sm:grid-cols-2 sm:p-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group/link rounded-sm px-4 py-3 transition-colors hover:bg-bynk-sky-soft"
            >
              <span className="block text-[15px] font-semibold text-bynk-navy-deep transition-colors group-hover/link:text-bynk-navy">
                {link.label}
              </span>
              {link.description ? (
                <span className="mt-1 block text-sm leading-snug text-bynk-muted">
                  {link.description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>

        <Link
          href={image.ctaHref}
          className="relative min-h-[220px] overflow-hidden bg-bynk-navy-deep md:min-h-[260px]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 hover:scale-105"
            sizes="380px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bynk-navy-deep/90 via-bynk-navy-deep/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-sm leading-relaxed text-white/90">{image.caption}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-bynk-sky">
              {image.ctaLabel}
              <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function isItemActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.mega?.links.some(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

export function Header() {
  const pathname = usePathname();
  const [sideOpen, setSideOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});
  const triggerRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sidePanelId = useId();
  const mobileNavId = useId();

  const activeItem = navItems.find((item) => item.label === activeMega) ?? null;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveMega(null), CLOSE_DELAY_MS);
  };

  const updatePanelPosition = useCallback((label: string) => {
    const trigger = triggerRefs.current[label];
    if (!trigger) return;
    setPanelStyle(getMegaPosition(trigger.getBoundingClientRect()));
  }, []);

  const openMega = (label: string) => {
    clearCloseTimer();
    setActiveMega(label);
    updatePanelPosition(label);
  };

  useLayoutEffect(() => {
    if (!activeMega) return;
    updatePanelPosition(activeMega);
  }, [activeMega, updatePanelPosition]);

  useEffect(() => {
    if (!activeMega) return;

    const reposition = () => updatePanelPosition(activeMega);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [activeMega, updatePanelPosition]);

  useEffect(() => {
    document.body.style.overflow = sideOpen || navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sideOpen, navOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <header className={`bynk-header w-full ${scrolled ? "is-scrolled" : ""}`}>
      <div className="mx-auto flex h-[100px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-3" aria-label={brand.name}>
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={220}
            height={72}
            priority
            className="h-16 w-auto object-contain sm:h-[4.5rem]"
          />
        </Link>

        <nav
          className="bynk-nav-pill relative hidden items-center p-1 lg:flex"
          aria-label="Primary"
          style={{ fontFamily: '"Google Sans", sans-serif' }}
          onMouseLeave={scheduleClose}
        >
          {navItems.map((item) => {
            const hasMega = Boolean(item.mega);
            const active = isItemActive(pathname, item);
            const megaOpen = activeMega === item.label;

            return (
              <div
                key={item.label}
                className="relative"
                ref={(node) => {
                  triggerRefs.current[item.label] = node;
                }}
                onMouseEnter={() => {
                  if (hasMega) openMega(item.label);
                  else {
                    clearCloseTimer();
                    setActiveMega(null);
                  }
                }}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-sm px-3.5 py-2.5 text-[14px] font-medium uppercase tracking-[0.08em] transition-colors ${
                    active || megaOpen
                      ? "bg-white text-[#0b1220] shadow-sm"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                  style={{ fontFamily: '"Google Sans", sans-serif' }}
                  aria-expanded={hasMega ? megaOpen : undefined}
                  aria-haspopup={hasMega ? "true" : undefined}
                  onFocus={() => {
                    if (hasMega) openMega(item.label);
                  }}
                >
                  {item.label}
                  {hasMega ? <Chevron open={megaOpen} /> : null}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <StrategyButton />

          <button
            type="button"
            className="bynk-icon-btn hidden h-12 w-12 items-center justify-center text-white lg:inline-flex"
            aria-label="Open sidebar"
            aria-expanded={sideOpen}
            aria-controls={sidePanelId}
            onClick={() => setSideOpen(true)}
          >
            <span className="bynk-icon-btn__glyph">
              <DiamondGridIcon />
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="bynk-icon-btn inline-flex h-11 w-11 items-center justify-center text-white"
            aria-expanded={navOpen}
            aria-controls={mobileNavId}
            aria-label={navOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setNavOpen((v) => !v);
              setSideOpen(false);
            }}
          >
            <HamburgerIcon open={navOpen} />
          </button>

          <button
            type="button"
            className="bynk-icon-btn inline-flex h-11 w-11 items-center justify-center text-white"
            aria-expanded={sideOpen}
            aria-controls={sidePanelId}
            aria-label={sideOpen ? "Close sidebar" : "Open sidebar"}
            onClick={() => {
              setSideOpen((v) => !v);
              setNavOpen(false);
            }}
          >
            <span className="bynk-icon-btn__glyph">
              <DiamondGridIcon />
            </span>
          </button>
        </div>
      </div>

      {navOpen ? (
        <div
          id={mobileNavId}
          className="max-h-[calc(100dvh-100px)] overflow-y-auto border-t border-white/10 bg-[#07111f]/95 backdrop-blur-xl lg:hidden"
          style={{ fontFamily: '"Google Sans", sans-serif' }}
        >
          <nav className="flex flex-col px-5 py-4" aria-label="Mobile primary">
            {navItems.map((item) => {
              const open = openSection === item.label;
              const active = isItemActive(pathname, item);

              if (!item.mega) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`border-b border-white/10 py-4 text-sm font-medium uppercase tracking-[0.08em] ${
                      active ? "text-white" : "text-white/80"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="border-b border-white/10 py-2">
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between py-3 text-left text-sm font-medium uppercase tracking-[0.08em] ${
                      active ? "text-white" : "text-white/80"
                    }`}
                    aria-expanded={open}
                    onClick={() => setOpenSection(open ? null : item.label)}
                  >
                    {item.label}
                    <Chevron open={open} />
                  </button>
                  {open ? (
                    <ul className="space-y-1 pb-3">
                      {item.mega.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="block rounded-sm px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-white/85 hover:bg-white/10"
                            onClick={() => setNavOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
            <StrategyButton
              className="mt-4 w-full justify-between"
              onClick={() => setNavOpen(false)}
            />
          </nav>
        </div>
      ) : null}

      {activeItem?.mega ? (
        <div
          className="bynk-mega-panel z-[60]"
          style={panelStyle}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <MegaPanelContent item={activeItem} />
        </div>
      ) : null}

      <SidePanel open={sideOpen} onClose={() => setSideOpen(false)} panelId={sidePanelId} />
    </header>
  );
}
