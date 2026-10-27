import OpenAI from "openai";
import { buildBotReply } from "@/lib/chat/bot";
import { buildSupportSystemPrompt } from "@/lib/chat/prompt";

export type ChatTurn = {
  role: "user" | "assistant" | "agent" | "system";
  body: string;
};

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function generateSupportReply(
  latestUserMessage: string,
  history: ChatTurn[],
): Promise<{ reply: string; source: "openai" | "fallback" }> {
  const client = getClient();
  if (!client) {
    return { reply: buildBotReply(latestUserMessage), source: "fallback" };
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSupportSystemPrompt() },
  ];

  for (const turn of history.slice(-16)) {
    if (turn.role === "user") {
      messages.push({ role: "user", content: turn.body });
    } else if (turn.role === "assistant" || turn.role === "agent") {
      messages.push({ role: "assistant", content: turn.body });
    } else if (turn.role === "system") {
      messages.push({ role: "system", content: turn.body });
    }
  }

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.5,
      max_tokens: 420,
      messages,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return { reply: buildBotReply(latestUserMessage), source: "fallback" };
    }

    return { reply, source: "openai" };
  } catch {
    return { reply: buildBotReply(latestUserMessage), source: "fallback" };
  }
}
