import { SystemPrompts } from "../../constants/defaults";
import { callGroqAPI } from "../../infrastructure/groq/groqApi";
import { callAI } from "../../utils/ai";
import {
  removeBase64ImagesFromCSS,
  removeImageSrcAttributes,
} from "../../utils/cleanAiInput";
import {
  extractCleanHTML,
  extractHtmlAndCss,
  sanitizeLLMResponse,
} from "../../utils/extractHtml";

export async function updateHTML({
  prompt,
  html,
  css = "",
}: {
  prompt: string;
  html: string;
  css?: string;
}): Promise<{ html: string; css: string }> {
  const cleanedHtml = removeImageSrcAttributes(html);
  const cleanedCss = removeBase64ImagesFromCSS(css);

  const fullPrompt = `
You're a frontend assistant. Update the following HTML and CSS based on this instruction: "${prompt}"

HTML:
${cleanedHtml}

CSS:
${cleanedCss}

Return ONLY the updated HTML and CSS (wrapped in <style> if needed). Do NOT include explanations.
`;
  const rawResponse = await callAI(fullPrompt, SystemPrompts.UPDATE);
  let response = extractHtmlAndCss(rawResponse);
  html = extractCleanHTML(response.html);
  html = extractCleanHTML(html);
  return { html: html, css: response.css };
}
