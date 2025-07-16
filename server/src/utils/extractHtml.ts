export function extractHtmlAndCss(content: string): {
  html: string;
  css: string;
} {
  const htmlMatch = content.match(/```html\n([\s\S]*?)```/);
  const cssMatch = content.match(/```css\n([\s\S]*?)```/);

  const html = htmlMatch?.[1]?.trim() || "";
  const css = cssMatch?.[1]?.trim() || "";

  return { html, css };
}

export const extractCleanHTML = (htmlRaw: string) => {
  const match = htmlRaw.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  return match ? match[1] : htmlRaw;
};
