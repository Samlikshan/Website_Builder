export function extractHtmlAndCss(content: string): {
  html: string;
  css: string;
} {
  // Try strict code block format first
  const htmlMatch = content.match(/```html\n([\s\S]*?)```/i);
  const cssMatch = content.match(/```css\n([\s\S]*?)```/i);

  let html = htmlMatch?.[1]?.trim() || "";
  let css = cssMatch?.[1]?.trim() || "";

  // Fallback: extract <style>...</style> from inside html
  if (!css && html.includes("<style")) {
    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    css = styleMatch?.[1]?.trim() || "";
  }

  // Fallback: if no ```html``` match, but full document is given
  if (!html && content.includes("<html")) {
    html = content;
  }

  return { html, css };
}

export const extractCleanHTML = (htmlRaw: string) => {
  const match = htmlRaw.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  return match ? match[1] : htmlRaw;
};

export function sanitizeLLMResponse(raw: string): string {
  return raw
    .replace(/```(?:html|css)?/gi, "") // remove ```html or ```css
    .replace(/'''(?:html|css)?/gi, "") // remove '''html or '''css
    .replace(/http'''/gi, "") // remove http'''
    .replace(/```|'''/g, "") // remove remaining ``` or '''
    .trim();
}


