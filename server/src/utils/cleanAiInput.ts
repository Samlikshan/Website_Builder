export function removeBase64ImagesFromCSS(css: string): string {
  return css.replace(/url\(['"]?data:image\/[^'")]+['"]?\)/gi, 'url("")');
}

export function removeImageSrcAttributes(html: string): string {
  return html
    .replace(/src\s*=\s*['"]data:image\/[^'"]+['"]/gi, "")
    .replace(/src\s*=\s*['"]https?:\/\/[^'"]+['"]/gi, "")
    .replace(/imgurl\s*=\s*['"][^'"]+['"]/gi, "");
}
