import { SystemPrompts } from "../../constants/defaults";
import { callAI } from "../../utils/ai";
import { extractCleanHTML, extractHtmlAndCss } from "../../utils/extractHtml";
import { logPrompt } from "../../utils/logger";

export async function generateHTML(
  prompt: string,
  provider: "groq" | "openai"
): Promise<{ html: string; css: string }> {
  logPrompt(prompt, provider);
  const response = await callAI(prompt, SystemPrompts.DEFAULT, provider);

  let { html, css } = extractHtmlAndCss(response);
  html = extractCleanHTML(html);
  return { html, css };
}
