"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { brand } from "@/lib/brand";
import { buildBotReply } from "@/lib/chat/bot";
import {
  getStoredSessionId,
  getVisitorKey,
  setStoredSessionId,
} from "@/lib/chat/visitor";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatMessage as DbChatMessage,
  ChatSession,
  ChatSessionStatus,
} from "@/lib/supabase/types";

async function requestBotReply(sessionId: string) {
  const response = await fetch("/api/chat/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
  });

  const payload = (await response.json()) as {
    message?: DbChatMessage;
    error?: string;
  };

  if (!response.ok || !payload.message) {
    throw new Error(payload.error ?? "Could not generate a reply");
  }

  return payload.message;
}

type UiMessage = {
  id: string;
  role: "assistant" | "user" | "agent" | "system";
  text: string;
};

const WELCOME_TEXT =
  "Hi, I’m the BYNK support assistant. I can help with services, booking a strategy session, or directing you to the right next step.";

const quickPrompts = [
  "What services do you offer?",
  "How can I book a strategy session?",
  "Where is BYNK based?",
] as const;

function statusLabel(status: ChatSessionStatus) {
  if (status === "waiting") return "Waiting for a BYNK advisor…";
  if (status === "human") return "Connected with BYNK team";
  if (status === "closed") return "Chat closed";
  return "Customer support · usually replies instantly";
}

function mapDbMessage(message: DbChatMessage): UiMessage {
  return {
    id: message.id,
    role: message.role,
    text: message.body,
  };
}

export function SupportChat() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionStatus, setSessionStatus] =
    useState<ChatSessionStatus>("bot");
  const [messages, setMessages] = useState<UiMessage[]>([
    { id: "welcome", role: "assistant", text: WELCOME_TEXT },
  ]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string | null>(null);
  const statusRef = useRef<ChatSessionStatus>("bot");

  const sessionStarted = messages.some((message) => message.role === "user");
  const humanMode =
    sessionStatus === "waiting" ||
    sessionStatus === "human" ||
    sessionStatus === "closed";

  useEffect(() => {
    sessionIdRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    statusRef.current = sessionStatus;
  }, [sessionStatus]);

  const ensureSession = useCallback(async () => {
    if (sessionIdRef.current) return sessionIdRef.current;

    const supabase = createClient();
    const visitorKey = getVisitorKey();
    const storedId = getStoredSessionId();

    if (storedId) {
      const { data: existing } = await supabase
        .from("chat_sessions")
        .select("*")
        .eq("id", storedId)
        .maybeSingle();

      if (existing && existing.status !== "closed") {
        setSessionId(existing.id);
        setSessionStatus(existing.status);
        sessionIdRef.current = existing.id;
        statusRef.current = existing.status;
        return existing.id;
      }
    }

    const { data: openSession } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("visitor_key", visitorKey)
      .in("status", ["bot", "waiting", "human"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (openSession) {
      setStoredSessionId(openSession.id);
      setSessionId(openSession.id);
      setSessionStatus(openSession.status);
      sessionIdRef.current = openSession.id;
      statusRef.current = openSession.status;
      return openSession.id;
    }

    const { data: created, error: createError } = await supabase
      .from("chat_sessions")
      .insert({ visitor_key: visitorKey, status: "bot" })
      .select("*")
      .single();

    if (createError || !created) {
      throw createError ?? new Error("Could not start chat session");
    }

    setStoredSessionId(created.id);
    setSessionId(created.id);
    setSessionStatus(created.status);
    sessionIdRef.current = created.id;
    statusRef.current = created.status;
    return created.id;
  }, []);

  const persistMessage = useCallback(
    async (
      role: DbChatMessage["role"],
      body: string,
      targetSessionId?: string,
    ) => {
      const id = targetSessionId ?? (await ensureSession());
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("chat_messages")
        .insert({ session_id: id, role, body })
        .select("*")
        .single();

      if (insertError) throw insertError;
      return data;
    },
    [ensureSession],
  );

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const supabase = createClient();
        const visitorKey = getVisitorKey();
        const storedId = getStoredSessionId();

        let session: ChatSession | null = null;

        if (storedId) {
          const { data } = await supabase
            .from("chat_sessions")
            .select("*")
            .eq("id", storedId)
            .maybeSingle();
          if (data && data.status !== "closed") session = data;
        }

        if (!session) {
          const { data } = await supabase
            .from("chat_sessions")
            .select("*")
            .eq("visitor_key", visitorKey)
            .in("status", ["bot", "waiting", "human"])
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();
          session = data;
        }

        if (!session || cancelled) {
          if (!cancelled) setReady(true);
          return;
        }

        setStoredSessionId(session.id);
        setSessionId(session.id);
        setSessionStatus(session.status);
        sessionIdRef.current = session.id;
        statusRef.current = session.status;

        const { data: rows } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", session.id)
          .order("created_at", { ascending: true });

        if (cancelled) return;

        if (rows && rows.length > 0) {
          setMessages([
            { id: "welcome", role: "assistant", text: WELCOME_TEXT },
            ...rows.map(mapDbMessage),
          ]);
        }
      } catch {
        // Chat still works locally if Supabase is unavailable.
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`visitor-chat-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const row = payload.new as DbChatMessage;
          if (row.role === "user" || row.role === "assistant") return;
          setMessages((prev) => {
            if (prev.some((message) => message.id === row.id)) return prev;
            return [...prev, mapDbMessage(row)];
          });
          if (row.role === "agent") setTyping(false);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          const row = payload.new as ChatSession;
          setSessionStatus(row.status);
          statusRef.current = row.status;
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [sessionId]);

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

  async function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || typing || busy) return;

    setError(null);
    setBusy(true);

    const optimisticId = `local-user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: optimisticId, role: "user", text },
    ]);
    setInput("");

    try {
      const id = await ensureSession();
      const saved = await persistMessage("user", text, id);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === optimisticId ? mapDbMessage(saved) : message,
        ),
      );

      if (statusRef.current !== "bot") {
        setBusy(false);
        return;
      }

      setTyping(true);
      try {
        const assistant = await requestBotReply(id);
        setMessages((prev) => {
          if (prev.some((message) => message.id === assistant.id)) return prev;
          return [...prev, mapDbMessage(assistant)];
        });
      } catch {
        try {
          const fallback = await persistMessage(
            "assistant",
            buildBotReply(text),
            id,
          );
          setMessages((prev) => [...prev, mapDbMessage(fallback)]);
        } catch {
          setMessages((prev) => [
            ...prev,
            {
              id: `assistant-local-${Date.now()}`,
              role: "assistant",
              text: buildBotReply(text),
            },
          ]);
        }
      } finally {
        setTyping(false);
        setBusy(false);
      }
    } catch {
      setError("Could not send message. Please try again.");
      setBusy(false);
      setTyping(false);
    }
  }

  async function requestHuman() {
    if (busy || humanMode) return;
    setBusy(true);
    setError(null);

    try {
      const id = await ensureSession();
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("chat_sessions")
        .update({ status: "waiting" })
        .eq("id", id);

      if (updateError) throw updateError;

      setSessionStatus("waiting");
      statusRef.current = "waiting";

      const system = await persistMessage(
        "system",
        "A visitor asked to talk to a person. A BYNK advisor will join shortly.",
        id,
      );
      setMessages((prev) => [...prev, mapDbMessage(system)]);
    } catch {
      setError("Could not request a human advisor. Please try again.");
    } finally {
      setBusy(false);
    }
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
                  {sessionStatus === "human" || sessionStatus === "waiting"
                    ? "BYNK Live Support"
                    : "BYNK Assistant"}
                </p>
                <p className="mt-0.5 text-[0.72rem] text-white/70">
                  {statusLabel(sessionStatus)}
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
              {messages.map((message) => {
                if (message.role === "system") {
                  return (
                    <p
                      key={message.id}
                      className="px-2 text-center text-[0.72rem] leading-relaxed text-[#5b6b7f]"
                    >
                      {message.text}
                    </p>
                  );
                }

                const isUser = message.role === "user";
                const isAgent = message.role === "agent";

                return (
                  <div
                    key={message.id}
                    className={
                      isUser
                        ? "ml-8 flex justify-end"
                        : "mr-8 flex justify-start"
                    }
                  >
                    <div className="max-w-full">
                      {isAgent ? (
                        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#12499d]">
                          BYNK advisor
                        </p>
                      ) : null}
                      <p
                        className={
                          isUser
                            ? "rounded-[0.85rem] rounded-br-[0.25rem] bg-[#12499d] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white"
                            : isAgent
                              ? "rounded-[0.85rem] rounded-bl-[0.25rem] bg-[#e7f6fd] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-[#0c2f66] ring-1 ring-[#4eb6ee]/35"
                              : "rounded-[0.85rem] rounded-bl-[0.25rem] bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-[#1a2433] shadow-[0_2px_10px_rgba(12,47,102,0.06)]"
                        }
                      >
                        {message.text}
                      </p>
                    </div>
                  </div>
                );
              })}

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

              {!sessionStarted && ready ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void sendMessage(prompt)}
                      className="rounded-full border border-[#d7e3ef] bg-white px-3 py-1.5 text-[0.75rem] font-medium text-[#0c2f66] transition-colors hover:border-[#4eb6ee] hover:text-[#12499d]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              ) : null}

              {!humanMode ? (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => void requestHuman()}
                    disabled={busy}
                    className="w-full rounded-[0.65rem] border border-[#12499d]/25 bg-white px-3 py-2.5 text-[0.82rem] font-semibold text-[#12499d] transition-colors hover:border-[#12499d] hover:bg-[#e7f6fd] disabled:opacity-50"
                  >
                    Talk to a person
                  </button>
                </div>
              ) : null}

              <p className="pt-1 text-[0.72rem] leading-relaxed text-[#5b6b7f]">
                Prefer email?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                  onClick={() => setOpen(false)}
                >
                  Contact BYNK
                </Link>{" "}
                or write{" "}
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="font-semibold text-[#12499d] underline underline-offset-2"
                >
                  {brand.contact.email}
                </a>
                .
              </p>

              {error ? (
                <p className="text-[0.75rem] font-medium text-[#b42318]">
                  {error}
                </p>
              ) : null}
            </div>

            <form
              className="flex items-center gap-2 border-t border-[#e8eef4] bg-white p-3"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
            >
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={
                  sessionStatus === "closed"
                    ? "This chat is closed"
                    : "Ask a question…"
                }
                aria-label="Message"
                disabled={sessionStatus === "closed"}
                className="min-w-0 flex-1 rounded-[0.65rem] border border-[#d7e3ef] bg-[#f8fafc] px-3 py-2.5 text-[0.9rem] text-[#080a12] outline-none transition-[border-color,box-shadow] placeholder:text-[#8a97a8] focus:border-[#4eb6ee] focus:shadow-[0_0_0_3px_rgba(78,182,238,0.18)] disabled:opacity-60"
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.65rem] bg-[#12499d] text-white transition-colors hover:bg-[#0c2f66] disabled:opacity-40"
                disabled={
                  !input.trim() || typing || busy || sessionStatus === "closed"
                }
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
                className={`h-2 w-2 shrink-0 rounded-full ${
                  sessionStatus === "waiting"
                    ? "bg-amber-400"
                    : "bg-[#22c55e]"
                }`}
                aria-hidden
              />
              {sessionStatus === "waiting"
                ? "Advisor requested"
                : sessionStatus === "human"
                  ? "Live with BYNK"
                  : "We are live"}
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
