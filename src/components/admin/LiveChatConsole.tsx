"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatMessage,
  ChatSession,
  ChatSessionStatus,
} from "@/lib/supabase/types";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function statusBadge(status: ChatSessionStatus) {
  if (status === "waiting") {
    return "bg-amber-100 text-amber-900";
  }
  if (status === "human") {
    return "bg-[#e7f6fd] text-[#0c2f66]";
  }
  if (status === "closed") {
    return "bg-[#eef1f5] text-[#5b6b7f]";
  }
  return "bg-white text-[#5b6b7f] ring-1 ring-[#d7e3ef]";
}

export function LiveChatConsole() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [agentId, setAgentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => sessions.find((session) => session.id === selectedId) ?? null,
    [sessions, selectedId],
  );

  const loadSessions = useCallback(async () => {
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setAgentId(user?.id ?? null);

      const { data, error: queryError } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("last_message_at", { ascending: false });

      if (queryError) throw queryError;
      setSessions(data ?? []);
      setSelectedId((current) => {
        if (current && data?.some((row) => row.id === current)) return current;
        const waiting = data?.find((row) => row.status === "waiting");
        return waiting?.id ?? data?.[0]?.id ?? null;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load chats.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (sessionId: string) => {
    const supabase = createClient();
    const { data, error: queryError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });

    if (queryError) {
      setError(queryError.message);
      return;
    }
    setMessages(data ?? []);
  }, []);

  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    void loadMessages(selectedId);
  }, [selectedId, loadMessages]);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin-chat")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_sessions",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as ChatSession;
            setSessions((prev) => {
              if (prev.some((session) => session.id === row.id)) return prev;
              return [row, ...prev];
            });
            return;
          }
          if (payload.eventType === "UPDATE") {
            const row = payload.new as ChatSession;
            setSessions((prev) => {
              const next = prev.map((session) =>
                session.id === row.id ? row : session,
              );
              return [...next].sort(
                (a, b) =>
                  new Date(b.last_message_at).getTime() -
                  new Date(a.last_message_at).getTime(),
              );
            });
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          const row = payload.new as ChatMessage;
          setMessages((prev) => {
            if (row.session_id !== selectedId) return prev;
            if (prev.some((message) => message.id === row.id)) return prev;
            return [...prev, row];
          });
          setSessions((prev) => {
            const next = prev.map((session) =>
              session.id === row.session_id
                ? { ...session, last_message_at: row.created_at }
                : session,
            );
            return [...next].sort(
              (a, b) =>
                new Date(b.last_message_at).getTime() -
                new Date(a.last_message_at).getTime(),
            );
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [selectedId]);

  async function takeOver() {
    if (!selected || !agentId) return;
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("chat_sessions")
      .update({ status: "human", assigned_agent_id: agentId })
      .eq("id", selected.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await supabase.from("chat_messages").insert({
      session_id: selected.id,
      role: "system",
      body: "A BYNK advisor has joined the conversation.",
      agent_id: agentId,
    });
  }

  async function closeSession() {
    if (!selected) return;
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("chat_sessions")
      .update({ status: "closed" })
      .eq("id", selected.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await supabase.from("chat_messages").insert({
      session_id: selected.id,
      role: "system",
      body: "This chat was closed by a BYNK advisor.",
      agent_id: agentId,
    });
  }

  async function returnToBot() {
    if (!selected) return;
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("chat_sessions")
      .update({ status: "bot", assigned_agent_id: null })
      .eq("id", selected.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await supabase.from("chat_messages").insert({
      session_id: selected.id,
      role: "system",
      body: "Returned to the automated assistant.",
      agent_id: agentId,
    });
  }

  async function sendReply(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !selected || !agentId || sending) return;
    if (selected.status === "closed") return;

    setSending(true);
    setError(null);

    try {
      const supabase = createClient();

      if (selected.status !== "human") {
        const { error: takeoverError } = await supabase
          .from("chat_sessions")
          .update({ status: "human", assigned_agent_id: agentId })
          .eq("id", selected.id);
        if (takeoverError) throw takeoverError;
      }

      const { error: insertError } = await supabase.from("chat_messages").insert({
        session_id: selected.id,
        role: "agent",
        body: text,
        agent_id: agentId,
      });

      if (insertError) throw insertError;
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send reply.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.35rem] font-bold tracking-tight text-[#0c2f66]">
            Live chat inbox
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#5b6b7f]">
            Waiting chats need a takeover. After that you can reply live.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadSessions()}
          className="rounded-[0.45rem] border border-[#d7e3ef] bg-white px-3 py-2 text-[0.88rem] font-medium text-[#0c2f66] hover:bg-[#f4f8fc]"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <p className="rounded-[0.55rem] border border-[#f5c2c0] bg-[#fff5f5] px-3 py-2 text-[0.9rem] text-[#b42318]">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-[0.95rem] text-[#5b6b7f]">Loading…</p>
      ) : sessions.length === 0 ? (
        <p className="rounded-[0.75rem] border border-dashed border-[#d7e3ef] bg-white px-4 py-10 text-center text-[0.95rem] text-[#5b6b7f]">
          No chat sessions yet.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)]">
          <ul className="max-h-[72vh] space-y-2 overflow-y-auto rounded-[0.75rem] border border-[#d7e3ef] bg-white p-2">
            {sessions.map((session) => {
              const active = selected?.id === session.id;
              return (
                <li key={session.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(session.id)}
                    className={
                      active
                        ? "w-full rounded-[0.55rem] bg-[#e7f6fd] px-3 py-3 text-left"
                        : "w-full rounded-[0.55rem] px-3 py-3 text-left hover:bg-[#f4f8fc]"
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[0.88rem] font-semibold text-[#0c2f66]">
                        {session.visitor_key.slice(0, 8)}…
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide ${statusBadge(session.status)}`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[0.72rem] text-[#8a97a8]">
                      {formatWhen(session.last_message_at)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <section className="flex h-[72vh] flex-col overflow-hidden rounded-[0.75rem] border border-[#d7e3ef] bg-white">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8eef4] px-4 py-3">
                <div>
                  <p className="text-[0.95rem] font-semibold text-[#0c2f66]">
                    Session {selected.id.slice(0, 8)}
                  </p>
                  <p className="text-[0.78rem] text-[#5b6b7f]">
                    Status: {selected.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.status === "waiting" ||
                  selected.status === "bot" ? (
                    <button
                      type="button"
                      onClick={() => void takeOver()}
                      className="rounded-[0.4rem] bg-[#12499d] px-3 py-1.5 text-[0.8rem] font-semibold text-white hover:bg-[#0c2f66]"
                    >
                      Take over
                    </button>
                  ) : null}
                  {selected.status === "human" ? (
                    <button
                      type="button"
                      onClick={() => void returnToBot()}
                      className="rounded-[0.4rem] border border-[#d7e3ef] px-3 py-1.5 text-[0.8rem] font-medium text-[#0c2f66] hover:bg-[#f4f8fc]"
                    >
                      Return to bot
                    </button>
                  ) : null}
                  {selected.status !== "closed" ? (
                    <button
                      type="button"
                      onClick={() => void closeSession()}
                      className="rounded-[0.4rem] border border-[#d7e3ef] px-3 py-1.5 text-[0.8rem] font-medium text-[#5b6b7f] hover:bg-[#f4f8fc]"
                    >
                      Close
                    </button>
                  ) : null}
                </div>
              </header>

              <div
                ref={listRef}
                className="flex-1 space-y-3 overflow-y-auto bg-[#f4f8fc] px-4 py-4"
              >
                {messages.map((message) => {
                  if (message.role === "system") {
                    return (
                      <p
                        key={message.id}
                        className="px-2 text-center text-[0.75rem] text-[#5b6b7f]"
                      >
                        {message.body}
                      </p>
                    );
                  }

                  const isVisitor = message.role === "user";
                  const isAgent = message.role === "agent";

                  return (
                    <div
                      key={message.id}
                      className={
                        isVisitor
                          ? "mr-10 flex justify-start"
                          : "ml-10 flex justify-end"
                      }
                    >
                      <div className="max-w-[85%]">
                        <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                          {isVisitor
                            ? "Visitor"
                            : isAgent
                              ? "You"
                              : "Assistant"}
                        </p>
                        <p
                          className={
                            isAgent
                              ? "rounded-[0.75rem] rounded-br-[0.25rem] bg-[#12499d] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white"
                              : isVisitor
                                ? "rounded-[0.75rem] rounded-bl-[0.25rem] bg-white px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-[#1a2433] shadow-[0_2px_10px_rgba(12,47,102,0.06)]"
                                : "rounded-[0.75rem] rounded-br-[0.25rem] bg-[#e7f6fd] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-[#0c2f66]"
                          }
                        >
                          {message.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={(event) => void sendReply(event)}
                className="flex items-center gap-2 border-t border-[#e8eef4] bg-white p-3"
              >
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={
                    selected.status === "closed"
                      ? "Chat closed"
                      : "Reply to visitor…"
                  }
                  disabled={selected.status === "closed" || sending}
                  className="min-w-0 flex-1 rounded-[0.55rem] border border-[#d7e3ef] bg-[#f8fafc] px-3 py-2.5 text-[0.9rem] text-[#0c2f66] outline-none focus:border-[#4eb6ee] focus:ring-2 focus:ring-[#4eb6ee]/20 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={
                    !draft.trim() || selected.status === "closed" || sending
                  }
                  className="rounded-[0.55rem] bg-[#12499d] px-4 py-2.5 text-[0.88rem] font-semibold text-white hover:bg-[#0c2f66] disabled:opacity-40"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </form>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
