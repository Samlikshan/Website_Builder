import { SystemPrompts } from "../../constants/defaults";
import { callAI } from "../../utils/ai";
import { extractCleanHTML, extractHtmlAndCss } from "../../utils/extractHtml";
import { logPrompt } from "../../utils/logger";

export async function generateHTML(
  prompt: string
): Promise<{ html: string; css: string }> {
  logPrompt(prompt);
  const response = await callAI(prompt, SystemPrompts.DEFAULT);

  let { html, css } = extractHtmlAndCss(response);
  html = extractCleanHTML(html);
  return { html, css };
}
