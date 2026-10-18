"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const quickPrompts = [
  "What services do you offer?",
  "How can I book a strategy session?",
  "Where is BYNK based?",
] as const;

function buildReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("service") || q.includes("offer") || q.includes("practice")) {
    return `BYNK advises across ${services.map((s) => s.title).join(", ")}. You can explore each practice on our Services page, or tell me which challenge you’re facing.`;
  }

  if (
    q.includes("book") ||
    q.includes("strategy") ||
    q.includes("meeting") ||
    q.includes("call") ||
    q.includes("contact")
  ) {
    return `You can reach the team at ${brand.contact.email}, or use the Contact page to book a strategy conversation. I’m here for quick questions while you decide.`;
  }

  if (
    q.includes("where") ||
    q.includes("location") ||
    q.includes("based") ||
    q.includes("office") ||
    q.includes("markham")
  ) {
    return `BYNK Advisory is based in ${brand.contact.location}. We work with financial institutions and fintech teams across Canada and beyond.`;
  }

  if (q.includes("ai") || q.includes("technology") || q.includes("tech")) {
    return "Our Technology & AI Advisory helps institutions adopt AI with governance, technology strategy, and human judgment. Ask about a specific use case, or open the Technology & AI page for more detail.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hello. I’m the BYNK assistant. Ask about our services, booking a strategy session, or how we help banks and fintech teams navigate technology, risk, and disputes.`;
  }

  return `Thanks for your note. For advice tailored to your institution, email ${brand.contact.email} or use Contact to start a conversation. Meanwhile, I can point you to services, booking, or our location.`;
}

export function SupportChat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: `Hi, I’m the BYNK support assistant. I can help with services, booking a strategy session, or directing you to the right next step.`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimerRef = useRef<number | null>(null);
  const sessionStarted = messages.some((message) => message.role === "user");

  useEffect(() => {
    if (!open) return;
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
    if (!typing) inputRef.current?.focus();
  }, [open, messages, typing]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current !== null) {
        window.clearTimeout(replyTimerRef.current);
      }
    };
  }, []);

  function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || typing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    if (replyTimerRef.current !== null) {
      window.clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: buildReply(text),
        },
      ]);
      setTyping(false);
      replyTimerRef.current = null;
    }, 1100);
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[80] flex justify-end p-4 sm:p-5"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {open ? (
          <section
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label="BYNK support chat"
            className="flex h-[min(34rem,calc(100dvh-6.5rem))] w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-[1.15rem] border border-[#d7e3ef] bg-white shadow-[0_18px_50px_rgba(7,17,31,0.22)]"
          >
            <header className="flex items-center gap-3 bg-[#0c2f66] px-4 py-3.5 text-white">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src="/icon.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.95rem] font-semibold leading-tight">
                  BYNK Assistant
                </p>
                <p className="mt-0.5 text-[0.72rem] text-white/70">
                  Customer support · usually replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[0.4rem] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-[#f4f8fc] px-3.5 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "user"
                      ? "ml-8 flex justify-end"
                      : "mr-8 flex justify-start"
                  }
                >
                  <p
                    className={
                      message.role === "user"
                        ? "rounded-[0.85rem] rounded-br-[0.25rem] bg-[#12499d] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white"
                        : "rounded-[0.85rem] rounded-bl-[0.25rem] bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-[#1a2433] shadow-[0_2px_10px_rgba(12,47,102,0.06)]"
                    }
                  >
                    {message.text}
                  </p>
                </div>
              ))}

              {typing ? (
                <div
                  className="mr-8 flex justify-start"
                  aria-live="polite"
                  aria-label="BYNK Assistant is typing"
                >
                  <div className="inline-flex items-center gap-1.5 rounded-[0.85rem] rounded-bl-[0.25rem] bg-white px-3.5 py-3 shadow-[0_2px_10px_rgba(12,47,102,0.06)]">
                    <span className="bynk-chat-dot" />
                    <span className="bynk-chat-dot" />
                    <span className="bynk-chat-dot" />
                  </div>
                </div>
              ) : null}

              {!sessionStarted ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-[#d7e3ef] bg-white px-3 py-1.5 text-[0.75rem] font-medium text-[#0c2f66] transition-colors hover:border-[#4eb6ee] hover:text-[#12499d]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              <p className="pt-1 text-[0.72rem] leading-relaxed text-[#5b6b7f]">
                Prefer a person?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                  onClick={() => setOpen(false)}
                >
                  Contact BYNK
                </Link>{" "}
                or email{" "}
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  {brand.contact.email}
                </a>
                .
              </p>
            </div>

            <form
              className="flex items-center gap-2 border-t border-[#e8eef4] bg-white p-3"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-[0.65rem] border border-[#d7e3ef] bg-[#f8fafc] px-3 py-2.5 text-[0.9rem] text-[#080a12] outline-none transition-[border-color,box-shadow] placeholder:text-[#8a97a8] focus:border-[#4eb6ee] focus:shadow-[0_0_0_3px_rgba(78,182,238,0.18)]"
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.65rem] bg-[#12499d] text-white transition-colors hover:bg-[#0c2f66] disabled:opacity-40"
                disabled={!input.trim() || typing}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </form>
          </section>
        ) : null}

        <div className="flex flex-col items-end gap-2">
          {!open ? (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.72rem] font-semibold text-[#0c2f66] shadow-[0_6px_18px_rgba(7,17,31,0.14)] ring-1 ring-[#d7e3ef]">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]"
                aria-hidden
              />
              We are live
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(7,17,31,0.22)] ring-1 ring-[#d7e3ef] transition-transform hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4eb6ee]"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close support chat" : "Open BYNK support chat"}
          >
            {open ? (
              <span className="text-[#0c2f66]">
                <CloseIcon />
              </span>
            ) : (
              <Image
                src="/icon.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                priority
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12l16-7-7 16-2.5-6.5L4 12z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
