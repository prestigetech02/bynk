"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/chat", label: "Live chat" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <nav className="flex items-center gap-1" aria-label="Admin">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "rounded-[0.45rem] bg-[#e7f6fd] px-2.5 py-1.5 text-[0.82rem] font-semibold text-[#0c2f66] sm:px-3 sm:text-[0.88rem]"
                : "rounded-[0.45rem] px-2.5 py-1.5 text-[0.82rem] font-medium text-[#5b6b7f] transition-colors hover:bg-[#f4f8fc] hover:text-[#0c2f66] sm:px-3 sm:text-[0.88rem]"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
