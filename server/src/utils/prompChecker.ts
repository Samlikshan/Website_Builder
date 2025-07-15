export function isPromptVague(input: any): boolean {
  const structured = [input.purpose, input.color, input.tone, input.font];
  const hasStructured = structured.some(Boolean);
  const isLayoutEmpty = input.layout.length <= 0;
  const isShort = (input.rawPrompt || "").trim().length < 30;
  const looksGeneric = /build.*website|create.*site/i.test(
    input.rawPrompt || ""
  );
  return !hasStructured && (isShort || looksGeneric || isLayoutEmpty);
}
