"use client";

import { usePathname } from "next/navigation";
import { WordMarquee } from "@/components/marquee/WordMarquee";

/** Footer marquee is for non-home pages only; the homepage has its own band. */
export function FooterMarquee() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="mt-8">
      <WordMarquee variant="footer" />
    </div>
  );
}
