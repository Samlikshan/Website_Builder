export function isPromptVague(input: any): boolean {
  const structured = [
    input.purpose,
    input.layout,
    input.color,
    input.tone,
    input.font,
    input.language,
  ];
  const hasStructured = structured.some(Boolean);
  const isShort = (input.rawPrompt || "").trim().length < 30;
  const looksGeneric = /build.*website|create.*site/i.test(
    input.rawPrompt || ""
  );
  return !hasStructured && (isShort || looksGeneric);
}
