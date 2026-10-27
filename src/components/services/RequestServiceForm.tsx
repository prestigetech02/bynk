"use client";

import { useState, type FormEvent } from "react";
import { StrategyButton } from "@/components/header/StrategyButton";
import { services } from "@/lib/services";
import { createClient } from "@/lib/supabase/client";

const fieldClass =
  "w-full rounded-[0.35rem] border border-[#d7eaf7] bg-white px-3.5 py-3 text-[0.92rem] text-[#0c2f66] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#4EB6EE] focus:ring-2 focus:ring-[#4EB6EE]/25";

type RequestServiceFormProps = {
  currentSlug: string;
};

export function RequestServiceForm({ currentSlug }: RequestServiceFormProps) {
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
    const serviceSlug = String(data.get("service") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const serviceTitle =
      services.find((item) => item.slug === serviceSlug)?.title ?? serviceSlug;

    setStatus("sending");
    setError(null);

    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({
          name,
          email,
          subject: `Service request: ${serviceTitle}`,
          message,
          source: "service",
          service_slug: serviceSlug,
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
    <div
      className="rounded-[1.15rem] bg-white p-5 sm:p-6"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#12499d]">
        Request a Service
      </p>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-[#5b6b7f]">
        Tell us what you need and BYNK will follow up to start the conversation.
      </p>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="mt-5 space-y-3.5"
        noValidate
      >
        <label className="block">
          <span className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
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
          <span className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
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

        <label className="block">
          <span className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Select service
          </span>
          <select
            name="service"
            required
            defaultValue={currentSlug}
            className={`${fieldClass} appearance-none bg-[length:0.85rem] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%230c2f66' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            }}
          >
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#0c2f66]">
            Message
          </span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Share a little context about your request."
            className={`${fieldClass} min-h-[110px] resize-y`}
          />
        </label>

        <div className="pt-1">
          <StrategyButton
            type="submit"
            label={status === "sending" ? "Sending…" : "Request Service"}
          />
        </div>

        {status === "sent" ? (
          <p className="text-[0.85rem] text-[#5b6b7f]">
            Thanks — your request was received. We’ll follow up soon.
          </p>
        ) : null}
        {status === "error" && error ? (
          <p className="text-[0.85rem] text-[#b42318]">{error}</p>
        ) : null}
      </form>
    </div>
  );
}
