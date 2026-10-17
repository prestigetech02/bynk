"use client";

import { useState, type FormEvent } from "react";
import { StrategyButton } from "@/components/header/StrategyButton";
import { brand } from "@/lib/brand";

const fieldClass =
  "w-full rounded-[0.45rem] border border-[#d7e3ef] bg-white px-4 py-3.5 text-[0.95rem] text-[#0c2f66] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#4EB6EE] focus:ring-2 focus:ring-[#4EB6EE]/25";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
      subject || "BYNK Advisory inquiry",
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("sent");
  }

  return (
    <form
      onSubmit={handleSubmit}
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
        <StrategyButton type="submit" label="Send Message" />
        {status === "sent" ? (
          <p className="text-[0.9rem] text-[#5b6b7f]">
            Opening your email client to reach {brand.contact.email}…
          </p>
        ) : null}
      </div>
    </form>
  );
}
