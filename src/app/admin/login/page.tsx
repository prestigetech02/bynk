import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { LoginNextReader } from "@/components/admin/LoginNextReader";
import { brand } from "@/lib/brand";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-6 flex flex-col items-center text-center">
        <span className="relative mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_rgba(12,47,102,0.12)] ring-1 ring-[#d7e3ef]">
          <Image
            src="/icon.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
        </span>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#12499d]">
          {brand.name}
        </p>
        <h1 className="mt-2 text-[1.55rem] font-bold tracking-tight text-[#0c2f66]">
          Admin sign in
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[#5b6b7f]">
          Access the dashboard, contact inbox, and live chat console.
        </p>
      </div>

      <div className="rounded-[1rem] border border-[#d7e3ef] bg-white p-6 shadow-[0_12px_40px_rgba(12,47,102,0.08)] sm:p-8">
        <Suspense fallback={<LoginForm nextPath="/admin" />}>
          <LoginNextReader />
        </Suspense>
      </div>
    </div>
  );
}
