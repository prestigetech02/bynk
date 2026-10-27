"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

const fieldClass =
  "w-full rounded-[0.45rem] border border-[#d7e3ef] bg-white px-3.5 py-3 text-[0.95rem] text-[#0c2f66] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#4EB6EE] focus:ring-2 focus:ring-[#4EB6EE]/25";

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.replace(nextPath);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not sign in. Try again.",
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
          Password
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </label>

      {error ? (
        <p className="text-[0.88rem] font-medium text-[#b42318]">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-[0.45rem] bg-[#12499d] px-4 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-[#0c2f66] disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
