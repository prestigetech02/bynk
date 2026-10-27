"use client";

import Image from "next/image";
import { useId, useState } from "react";

export type LeadershipMember = {
  name: string;
  nameAccent?: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  preview: string;
  paragraphs: string[];
  credentials: readonly { label: string; value: string }[];
};

export function LeadershipMemberCard({ member }: { member: LeadershipMember }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const [firstName, ...rest] = member.name.split(" ");
  const lastName = member.nameAccent ?? rest.join(" ");

  return (
    <article
      className="overflow-hidden rounded-[1.35rem] border border-[#d7e3ef] bg-white shadow-[0_18px_40px_-28px_rgba(12,47,102,0.45)]"
      style={{ fontFamily: '"Google Sans", sans-serif' }}
    >
      <div className="grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
        <div className="relative min-h-[320px] overflow-hidden bg-[#eaf2f8] sm:min-h-[380px] lg:min-h-full">
          <Image
            src={member.imageSrc}
            alt={member.imageAlt}
            fill
            className={`object-cover ${member.imagePosition ?? "object-center"}`}
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:p-9">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#1a2433]">
            {member.role}
          </p>
          <h3 className="mt-2 text-[clamp(1.55rem,2.6vw,2.15rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#080a12]">
            {firstName}{" "}
            <span
              className="font-normal italic text-[#3b82f6]"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              {lastName}
            </span>
          </h3>

          <div className="mt-4 flex-1">
            <p className="text-[0.98rem] leading-[1.75] text-[#3d4b5c]">
              {member.preview}
            </p>

            <div
              id={contentId}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 pt-4 text-[0.98rem] leading-[1.75] text-[#3d4b5c]">
                  {member.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-5 inline-flex w-fit items-center gap-2 text-[0.88rem] font-semibold text-[#12499d] transition hover:text-[#0c2f66]"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Read less" : "Read more"}
            <span aria-hidden className="text-[1.05rem] leading-none">
              {expanded ? "−" : "+"}
            </span>
          </button>

          <ul className="mt-6 grid grid-cols-1 gap-2 border-t border-[#e5eef6] pt-5 sm:grid-cols-2">
            {member.credentials.map((item) => (
              <li
                key={item.label}
                className="rounded-[0.7rem] bg-[#f4f8fc] px-3.5 py-3"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#4eb6ee]">
                  {item.label}
                </p>
                <p className="mt-1 whitespace-pre-line text-[0.86rem] font-semibold leading-snug text-[#0c2f66]">
                  {item.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
