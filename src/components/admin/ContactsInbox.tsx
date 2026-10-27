"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type {
  ContactSubmission,
  ContactSubmissionStatus,
} from "@/lib/supabase/types";
import { SignOutButton } from "@/components/admin/SignOutButton";

function formatWhen(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function ContactsInbox() {
  const [rows, setRows] = useState<ContactSubmission[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | ContactSubmissionStatus>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;
      setRows(data ?? []);
      setSelectedId((current) => current ?? data?.[0]?.id ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load submissions.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === "all") return rows;
    return rows.filter((row) => row.status === filter);
  }, [filter, rows]);

  const selected =
    filtered.find((row) => row.id === selectedId) ??
    filtered[0] ??
    null;

  async function setStatus(id: string, status: ContactSubmissionStatus) {
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status } : row)),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.55rem] font-bold tracking-tight text-[#0c2f66]">
            Contact submissions
          </h1>
          <p className="mt-1 text-[0.95rem] text-[#5b6b7f]">
            Messages from the contact and service request forms.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filter}
            onChange={(event) =>
              setFilter(event.target.value as typeof filter)
            }
            className="rounded-[0.45rem] border border-[#d7e3ef] bg-white px-3 py-2 text-[0.88rem] text-[#0c2f66]"
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="archived">Archived</option>
          </select>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-[0.45rem] border border-[#d7e3ef] bg-white px-3 py-2 text-[0.88rem] font-medium text-[#0c2f66] hover:bg-[#f4f8fc]"
          >
            Refresh
          </button>
          <SignOutButton />
        </div>
      </div>

      {error ? (
        <p className="rounded-[0.55rem] border border-[#f5c2c0] bg-[#fff5f5] px-3 py-2 text-[0.9rem] text-[#b42318]">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-[0.95rem] text-[#5b6b7f]">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-[0.75rem] border border-dashed border-[#d7e3ef] bg-white px-4 py-10 text-center text-[0.95rem] text-[#5b6b7f]">
          No submissions yet.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <ul className="max-h-[70vh] space-y-2 overflow-y-auto rounded-[0.75rem] border border-[#d7e3ef] bg-white p-2">
            {filtered.map((row) => {
              const active = selected?.id === row.id;
              return (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(row.id);
                      if (row.status === "new") void setStatus(row.id, "read");
                    }}
                    className={
                      active
                        ? "w-full rounded-[0.55rem] bg-[#e7f6fd] px-3 py-3 text-left"
                        : "w-full rounded-[0.55rem] px-3 py-3 text-left hover:bg-[#f4f8fc]"
                    }
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[0.92rem] font-semibold text-[#0c2f66]">
                        {row.name}
                      </p>
                      {row.status === "new" ? (
                        <span className="shrink-0 rounded-full bg-[#12499d] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                          New
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-[0.8rem] text-[#5b6b7f]">
                      {row.subject}
                    </p>
                    <p className="mt-1 text-[0.72rem] text-[#8a97a8]">
                      {formatWhen(row.created_at)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          {selected ? (
            <article className="rounded-[0.75rem] border border-[#d7e3ef] bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-[1.2rem] font-bold text-[#0c2f66]">
                    {selected.subject}
                  </h2>
                  <p className="mt-1 text-[0.9rem] text-[#5b6b7f]">
                    {formatWhen(selected.created_at)} · {selected.source}
                    {selected.service_slug
                      ? ` · ${selected.service_slug}`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void setStatus(selected.id, "read")}
                    className="rounded-[0.4rem] border border-[#d7e3ef] px-3 py-1.5 text-[0.8rem] font-medium text-[#0c2f66] hover:bg-[#f4f8fc]"
                  >
                    Mark read
                  </button>
                  <button
                    type="button"
                    onClick={() => void setStatus(selected.id, "archived")}
                    className="rounded-[0.4rem] border border-[#d7e3ef] px-3 py-1.5 text-[0.8rem] font-medium text-[#0c2f66] hover:bg-[#f4f8fc]"
                  >
                    Archive
                  </button>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                    Name
                  </dt>
                  <dd className="mt-1 text-[0.95rem] text-[#0c2f66]">
                    {selected.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                    Email
                  </dt>
                  <dd className="mt-1 text-[0.95rem]">
                    <a
                      href={`mailto:${selected.email}`}
                      className="font-medium text-[#12499d] underline underline-offset-2"
                    >
                      {selected.email}
                    </a>
                  </dd>
                </div>
                {selected.phone ? (
                  <div>
                    <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                      Phone
                    </dt>
                    <dd className="mt-1 text-[0.95rem] text-[#0c2f66]">
                      {selected.phone}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                    Status
                  </dt>
                  <dd className="mt-1 text-[0.95rem] capitalize text-[#0c2f66]">
                    {selected.status}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-[#e8eef4] pt-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#8a97a8]">
                  Message
                </p>
                <p className="mt-2 whitespace-pre-wrap text-[1rem] leading-relaxed text-[#1a2433]">
                  {selected.message}
                </p>
              </div>
            </article>
          ) : null}
        </div>
      )}
    </div>
  );
}
