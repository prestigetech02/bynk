import { NextResponse } from "next/server";
import { generateSupportReply } from "@/lib/chat/openai";
import { createPublicSupabaseClient } from "@/lib/supabase/admin";

type Body = {
  sessionId?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const sessionId = body.sessionId?.trim();
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
  }

  try {
    const supabase = createPublicSupabaseClient();

    const { data: session, error: sessionError } = await supabase
      .from("chat_sessions")
      .select("id, status")
      .eq("id", sessionId)
      .maybeSingle();

    if (sessionError) {
      return NextResponse.json({ error: sessionError.message }, { status: 500 });
    }

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (session.status !== "bot") {
      return NextResponse.json(
        { error: "Session is not in bot mode", status: session.status },
        { status: 409 },
      );
    }

    const { data: rows, error: messagesError } = await supabase
      .from("chat_messages")
      .select("role, body")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(24);

    if (messagesError) {
      return NextResponse.json({ error: messagesError.message }, { status: 500 });
    }

    const history = rows ?? [];
    const latestUser = [...history]
      .reverse()
      .find((row) => row.role === "user");

    if (!latestUser) {
      return NextResponse.json(
        { error: "No user message found for this session" },
        { status: 400 },
      );
    }

    const { reply, source } = await generateSupportReply(
      latestUser.body,
      history,
    );

    const { data: saved, error: insertError } = await supabase
      .from("chat_messages")
      .insert({
        session_id: sessionId,
        role: "assistant",
        body: reply,
      })
      .select("*")
      .single();

    if (insertError || !saved) {
      return NextResponse.json(
        { error: insertError?.message ?? "Could not save reply" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: saved,
      source,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not generate reply";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
