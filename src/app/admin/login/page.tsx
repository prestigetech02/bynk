import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";
import { LoginNextReader } from "@/components/admin/LoginNextReader";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center py-10">
      <div className="rounded-[1rem] border border-[#d7e3ef] bg-white p-6 shadow-[0_12px_40px_rgba(12,47,102,0.08)] sm:p-8">
        <h1 className="text-[1.45rem] font-bold tracking-tight text-[#0c2f66]">
          Sign in
        </h1>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[#5b6b7f]">
          Use your Supabase Auth email and password to open the BYNK admin
          inbox and live chat.
        </p>
        <div className="mt-6">
          <Suspense
            fallback={
              <LoginForm nextPath="/admin/contacts" />
            }
          >
            <LoginNextReader />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
