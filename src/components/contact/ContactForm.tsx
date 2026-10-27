"use client";

import { useState, type FormEvent } from "react";
import { StrategyButton } from "@/components/header/StrategyButton";
import { createClient } from "@/lib/supabase/client";

const fieldClass =
  "w-full rounded-[0.45rem] border border-[#d7e3ef] bg-white px-4 py-3.5 text-[0.95rem] text-[#0c2f66] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#4EB6EE] focus:ring-2 focus:ring-[#4EB6EE]/25";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("sending");
    setError(null);

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email,
          phone: phone || null,
          subject: subject || "BYNK Advisory inquiry",
          message,
          source: "contact",
        });

      if (insertError) throw insertError;

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className="space-y-4"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Full name
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Subject
          </span>
          <input
            name="subject"
            type="text"
            required
            placeholder="How can we help?"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about your institution, challenge, or the conversation you’d like to start."
          className={`${fieldClass} resize-y min-h-[160px]`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <StrategyButton
          type="submit"
          label={status === "sending" ? "Sending…" : "Send Message"}
        />
        {status === "sent" ? (
          <p className="text-[0.9rem] text-[#5b6b7f]">
            Thanks — your message was received. We’ll be in touch soon.
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-[0.9rem] text-[#b42318]">{error}</p>
        ) : null}
      </div>
    </form>
  );
}
