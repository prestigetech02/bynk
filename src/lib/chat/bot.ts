import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

export function buildBotReply(input: string): string {
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
    return `You can reach the team at ${brand.contact.email}, or use the Contact page to book a strategy conversation. I’m here for quick questions while you decide. You can also tap “Talk to a person” below.`;
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

  if (
    q.includes("human") ||
    q.includes("person") ||
    q.includes("agent") ||
    q.includes("someone")
  ) {
    return "I can connect you with a BYNK team member. Tap “Talk to a person” and an advisor will join this chat when available.";
  }

  return `Thanks for your note. For advice tailored to your institution, email ${brand.contact.email} or use Contact to start a conversation. Meanwhile, I can point you to services, booking, or our location — or tap “Talk to a person” for a live advisor.`;
}
