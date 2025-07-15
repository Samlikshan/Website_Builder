import { callGroqAPI } from "../../infrastructure/groq/groqApi";
import { logPrompt } from "../../utils/logger";

export async function generateHTML(prompt: string): Promise<string> {
  logPrompt(prompt);
  return await callGroqAPI(prompt);
}
