import { callGroq } from "./providers/groq";
import { callOpenAI } from "./providers/openAi";

const AI_PROVIDER = process.env.AI_PROVIDER?.toLowerCase() || "groq";

export async function callAI(
  prompt: string,
  systemPrompt: string
): Promise<string> {
  switch (AI_PROVIDER) {
    case "openai":
      return callOpenAI(prompt, systemPrompt);
    case "groq":
    default:
      return callGroq(prompt, systemPrompt);
  }
}
