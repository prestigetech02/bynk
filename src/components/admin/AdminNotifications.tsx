"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ChatSession, ContactSubmission } from "@/lib/supabase/types";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  href: string;
  createdAt: string;
  kind: "contact" | "chat";
};

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AdminNotifications() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const pushNotification = useCallback((item: NotificationItem) => {
    setItems((prev) => {
      if (prev.some((row) => row.id === item.id)) return prev;
      return [item, ...prev].slice(0, 30);
    });
    setUnread((count) => count + 1);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "contact_submissions",
        },
        (payload) => {
          const row = payload.new as ContactSubmission;
          pushNotification({
            id: `contact-${row.id}`,
            title: "New contact submission",
            detail: `${row.name} · ${row.subject}`,
            href: "/admin/contacts",
            createdAt: row.created_at,
            kind: "contact",
          });
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_sessions",
        },
        (payload) => {
          const row = payload.new as ChatSession;
          pushNotification({
            id: `chat-new-${row.id}`,
            title: "New chat session",
            detail: `Visitor started a chat · ${row.status}`,
            href: "/admin/chat",
            createdAt: row.created_at,
            kind: "chat",
          });
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat_sessions",
        },
        (payload) => {
          const row = payload.new as ChatSession;
          const prev = payload.old as Partial<ChatSession>;
          if (row.status === "waiting" && prev.status !== "waiting") {
            pushNotification({
              id: `chat-waiting-${row.id}-${row.updated_at}`,
              title: "Visitor requested a person",
              detail: "A live chat is waiting for takeover",
              href: "/admin/chat",
              createdAt: row.updated_at,
              kind: "chat",
            });
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [pushNotification]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!panelRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, []);

  function toggle() {
    setOpen((value) => {
      const next = !value;
      if (next) setUnread(0);
      return next;
    });
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={toggle}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-[0.5rem] border border-[#d7e3ef] bg-white text-[#0c2f66] transition-colors hover:bg-[#f4f8fc]"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <BellIcon />
        {unread > 0 ? (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#b42318] px-1 text-[0.65rem] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-[0.75rem] border border-[#d7e3ef] bg-white shadow-[0_18px_40px_rgba(12,47,102,0.16)]">
          <div className="flex items-center justify-between border-b border-[#e8eef4] px-4 py-3">
            <p className="text-[0.9rem] font-semibold text-[#0c2f66]">
              Notifications
            </p>
            <button
              type="button"
              className="text-[0.75rem] font-medium text-[#5b6b7f] hover:text-[#12499d]"
              onClick={() => {
                setItems([]);
                setUnread(0);
              }}
            >
              Clear
            </button>
          </div>

          {items.length === 0 ? (
            <p className="px-4 py-8 text-center text-[0.88rem] text-[#5b6b7f]">
              No new notifications. Live updates appear here.
            </p>
          ) : (
            <ul className="max-h-[22rem] overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="border-b border-[#eef2f6] last:border-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 transition-colors hover:bg-[#f4f8fc]"
                  >
                    <p className="text-[0.88rem] font-semibold text-[#0c2f66]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[0.8rem] leading-snug text-[#5b6b7f]">
                      {item.detail}
                    </p>
                    <p className="mt-1 text-[0.7rem] text-[#8a97a8]">
                      {formatWhen(item.createdAt)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9ZM10 21a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
