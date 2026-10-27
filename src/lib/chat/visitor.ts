const VISITOR_KEY = "bynk_chat_visitor_key";
const SESSION_KEY = "bynk_chat_session_id";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getVisitorKey(): string {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = createId();
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
}

export function getStoredSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

export function setStoredSessionId(sessionId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, sessionId);
}

export function clearStoredSessionId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
