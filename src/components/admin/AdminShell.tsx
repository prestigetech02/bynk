"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminNotifications } from "@/components/admin/AdminNotifications";
import { brand } from "@/lib/brand";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  {
    href: "/admin",
    label: "Overview",
    match: (path: string) => path === "/admin",
    icon: OverviewIcon,
  },
  {
    href: "/admin/contacts",
    label: "Contacts",
    match: (path: string) => path.startsWith("/admin/contacts"),
    icon: ContactsIcon,
  },
  {
    href: "/admin/chat",
    label: "Live chat",
    match: (path: string) => path.startsWith("/admin/chat"),
    icon: ChatIcon,
  },
] as const;

function pageTitle(pathname: string) {
  if (pathname.startsWith("/admin/contacts")) return "Contacts";
  if (pathname.startsWith("/admin/chat")) return "Live chat";
  if (pathname === "/admin/login") return "Sign in";
  return "Overview";
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isLogin) return;
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, [isLogin]);

  async function signOut() {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  if (isLogin) {
    return (
      <div
        className="min-h-full bg-[#f4f7fb]"
        style={{ fontFamily: '"Google Sans", sans-serif' }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className="flex min-h-full bg-[#eef3f8]"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#0c2f66]/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[16.5rem] flex-col border-r border-[#d7e3ef] bg-[#0c2f66] text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[4.25rem] items-center gap-3 border-b border-white/10 px-5">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/icon.png"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[0.95rem] font-semibold leading-tight">
                {brand.shortName}
              </span>
              <span className="block text-[0.72rem] text-white/65">
                Admin dashboard
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin">
          {navItems.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "flex items-center gap-3 rounded-[0.55rem] bg-white/15 px-3 py-2.5 text-[0.92rem] font-semibold text-white"
                    : "flex items-center gap-3 rounded-[0.55rem] px-3 py-2.5 text-[0.92rem] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                }
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-[0.55rem] px-3 py-2.5 text-[0.9rem] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalIcon />
            View site
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            disabled={signingOut}
            className="flex w-full items-center gap-3 rounded-[0.55rem] px-3 py-2.5 text-left text-[0.9rem] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
          >
            <SignOutIcon />
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[4.25rem] items-center justify-between gap-3 border-b border-[#d7e3ef] bg-white/95 px-4 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-[#d7e3ef] text-[#0c2f66] lg:hidden"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </button>
            <div className="min-w-0">
              <p className="truncate text-[1.05rem] font-bold tracking-tight text-[#0c2f66]">
                {pageTitle(pathname)}
              </p>
              <p className="hidden truncate text-[0.78rem] text-[#5b6b7f] sm:block">
                {brand.name} operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <AdminNotifications />
            <div className="hidden max-w-[14rem] truncate rounded-full bg-[#f4f8fc] px-3 py-1.5 text-[0.8rem] font-medium text-[#0c2f66] sm:block">
              {email ?? "Admin"}
            </div>
            <Link
              href="/admin"
              className="relative hidden h-9 w-9 overflow-hidden rounded-full ring-1 ring-[#d7e3ef] sm:block"
              aria-label="Dashboard home"
            >
              <Image
                src={brand.logo.src}
                alt={brand.logo.alt}
                fill
                className="object-contain bg-white p-1"
                sizes="36px"
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

function OverviewIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 13h7V4H4v9Zm9 7h7V11h-7v9ZM4 20h7v-5H4v5Zm9-11h7V4h-7v5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 3h7v7M10 14 21 3M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SignOutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
