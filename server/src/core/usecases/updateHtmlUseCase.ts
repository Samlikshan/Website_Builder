import { callGroqAPI } from "../../infrastructure/groq/groqApi";
import { extractCleanHTML } from "../../utils/extractHtml";

export async function updateHTML({
  prompt,
  html,
  css = "",
}: {
  prompt: string;
  html: string;
  css?: string;
}): Promise<{ html: string; css: string }> {
  const fullPrompt = `
You're a frontend assistant. Update the following HTML and CSS based on this instruction: "${prompt}"

HTML:
${html}

CSS:
${css}

Return ONLY the updated HTML and CSS (wrapped in <style> if needed). Do NOT include explanations.
`;

  const response = await callGroqAPI(fullPrompt);
  const cleanedHtml = response
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .trim();
  const cssMatch = response.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const cleanedCss = cssMatch ? cssMatch[1].trim() : "";
  html = extractCleanHTML(cleanedHtml);
  return { html: cleanedHtml, css: cleanedCss };
}
