"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

export function LoginNextReader() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("next");
  const nextPath =
    raw && raw.startsWith("/admin") ? raw : "/admin/contacts";

  return <LoginForm nextPath={nextPath} />;
}
