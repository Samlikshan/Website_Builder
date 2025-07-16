import { callGroqAPI } from "../../infrastructure/groq/groqApi";
import { extractCleanHTML, extractHtmlAndCss } from "../../utils/extractHtml";
import { logPrompt } from "../../utils/logger";

export async function generateHTML(
  prompt: string
): Promise<{ html: string; css: string }> {
  logPrompt(prompt);
  const response = await callGroqAPI(prompt);
  let { html, css } = extractHtmlAndCss(response);
  html = extractCleanHTML(html);
  return { html, css };
}
