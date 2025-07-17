import { callGroq } from "./providers/groq";
import { callOpenAI } from "./providers/openAi";

// const AI_PROVIDER = process.env.AI_PROVIDER?.toLowerCase() || "groq";

export async function callAI(
  prompt: string,
  systemPrompt: string,
  provider: "groq" | "openai"
): Promise<string> {
  switch (provider) {
    case "openai":
      return callOpenAI(prompt, systemPrompt);
    case "groq":
      return callGroq(prompt, systemPrompt);
    default:
      return callGroq(prompt, systemPrompt);
  }
}
