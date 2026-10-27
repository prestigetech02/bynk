import type { Metadata } from "next";
import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-full flex-col bg-[#f4f7fb]"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <header className="border-b border-[#d7e3ef] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-[1.05rem] font-bold tracking-tight text-[#0c2f66]"
            >
              {brand.name} Admin
            </Link>
            <AdminNav />
          </div>
          <Link
            href="/"
            className="text-[0.85rem] font-medium text-[#5b6b7f] transition-colors hover:text-[#12499d]"
          >
            View site
          </Link>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  );
}
