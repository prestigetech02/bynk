"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  ChatSession,
  ContactSubmission,
} from "@/lib/supabase/types";

type Stats = {
  contactsTotal: number;
  contactsNew: number;
  contactsRead: number;
  contactsArchived: number;
  chatsTotal: number;
  chatsWaiting: number;
  chatsLive: number;
  chatsBot: number;
  chatsClosed: number;
};

const emptyStats: Stats = {
  contactsTotal: 0,
  contactsNew: 0,
  contactsRead: 0,
  contactsArchived: 0,
  chatsTotal: 0,
  chatsWaiting: 0,
  chatsLive: 0,
  chatsBot: 0,
  chatsClosed: 0,
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function DashboardOverview() {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [recentContacts, setRecentContacts] = useState<ContactSubmission[]>([]);
  const [waitingChats, setWaitingChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const supabase = createClient();
      const [contactsRes, chatsRes] = await Promise.all([
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("chat_sessions")
          .select("*")
          .order("last_message_at", { ascending: false }),
      ]);

      if (contactsRes.error) throw contactsRes.error;
      if (chatsRes.error) throw chatsRes.error;

      const contacts = contactsRes.data ?? [];
      const chats = chatsRes.data ?? [];

      setStats({
        contactsTotal: contacts.length,
        contactsNew: contacts.filter((row) => row.status === "new").length,
        contactsRead: contacts.filter((row) => row.status === "read").length,
        contactsArchived: contacts.filter((row) => row.status === "archived")
          .length,
        chatsTotal: chats.length,
        chatsWaiting: chats.filter((row) => row.status === "waiting").length,
        chatsLive: chats.filter((row) => row.status === "human").length,
        chatsBot: chats.filter((row) => row.status === "bot").length,
        chatsClosed: chats.filter((row) => row.status === "closed").length,
      });
      setRecentContacts(contacts.slice(0, 5));
      setWaitingChats(chats.filter((row) => row.status === "waiting").slice(0, 5));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("admin-dashboard-stats")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_submissions" },
        () => {
          void load();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_sessions" },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.55rem] font-bold tracking-tight text-[#0c2f66]">
            Dashboard
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#5b6b7f]">
            Contact inbox and live chat activity at a glance.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            void load();
          }}
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
        <p className="text-[0.95rem] text-[#5b6b7f]">Loading dashboard…</p>
      ) : (
        <>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total contacts"
              value={stats.contactsTotal}
              hint="All form submissions"
              href="/admin/contacts"
            />
            <StatCard
              label="New / unread"
              value={stats.contactsNew}
              hint="Needs review"
              href="/admin/contacts"
              accent="amber"
            />
            <StatCard
              label="Reviewed"
              value={stats.contactsRead}
              hint="Marked as read"
              href="/admin/contacts"
            />
            <StatCard
              label="Archived"
              value={stats.contactsArchived}
              hint="Closed inquiries"
              href="/admin/contacts"
            />
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Waiting for agent"
              value={stats.chatsWaiting}
              hint="Talk to a person"
              href="/admin/chat"
              accent="amber"
            />
            <StatCard
              label="Live with agent"
              value={stats.chatsLive}
              hint="Human takeover active"
              href="/admin/chat"
              accent="sky"
            />
            <StatCard
              label="Bot chats"
              value={stats.chatsBot}
              hint="Assistant handling"
              href="/admin/chat"
            />
            <StatCard
              label="Closed chats"
              value={stats.chatsClosed}
              hint={`of ${stats.chatsTotal} total`}
              href="/admin/chat"
            />
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[0.85rem] border border-[#d7e3ef] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[1.05rem] font-bold text-[#0c2f66]">
                  Recent contacts
                </h2>
                <Link
                  href="/admin/contacts"
                  className="text-[0.82rem] font-semibold text-[#12499d] hover:underline"
                >
                  View all
                </Link>
              </div>
              {recentContacts.length === 0 ? (
                <p className="mt-6 text-[0.9rem] text-[#5b6b7f]">
                  No contact submissions yet.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-[#eef2f6]">
                  {recentContacts.map((row) => (
                    <li key={row.id} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[0.92rem] font-semibold text-[#0c2f66]">
                            {row.name}
                          </p>
                          <p className="truncate text-[0.8rem] text-[#5b6b7f]">
                            {row.subject}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-[#f4f8fc] px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-[#5b6b7f]">
                          {row.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.72rem] text-[#8a97a8]">
                        {formatWhen(row.created_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-[0.85rem] border border-[#d7e3ef] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[1.05rem] font-bold text-[#0c2f66]">
                  Waiting chats
                </h2>
                <Link
                  href="/admin/chat"
                  className="text-[0.82rem] font-semibold text-[#12499d] hover:underline"
                >
                  Open inbox
                </Link>
              </div>
              {waitingChats.length === 0 ? (
                <p className="mt-6 text-[0.9rem] text-[#5b6b7f]">
                  No visitors waiting for a person right now.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-[#eef2f6]">
                  {waitingChats.map((row) => (
                    <li key={row.id} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-[0.92rem] font-semibold text-[#0c2f66]">
                            Session {row.id.slice(0, 8)}
                          </p>
                          <p className="text-[0.8rem] text-[#5b6b7f]">
                            Requested a human advisor
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-amber-900">
                          Waiting
                        </span>
                      </div>
                      <p className="mt-1 text-[0.72rem] text-[#8a97a8]">
                        {formatWhen(row.last_message_at)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  href,
  accent,
}: {
  label: string;
  value: number;
  hint: string;
  href: string;
  accent?: "amber" | "sky";
}) {
  const ring =
    accent === "amber"
      ? "ring-amber-200"
      : accent === "sky"
        ? "ring-[#bfe6f8]"
        : "ring-[#d7e3ef]";

  return (
    <Link
      href={href}
      className={`rounded-[0.85rem] bg-white p-4 shadow-[0_8px_24px_rgba(12,47,102,0.04)] ring-1 ${ring} transition-transform hover:-translate-y-0.5`}
    >
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#5b6b7f]">
        {label}
      </p>
      <p className="mt-2 text-[1.85rem] font-bold tracking-tight text-[#0c2f66]">
        {value}
      </p>
      <p className="mt-1 text-[0.8rem] text-[#8a97a8]">{hint}</p>
    </Link>
  );
}
