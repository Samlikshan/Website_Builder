import { PromptDefaults } from "../constants/defaults";

export function buildFinalPrompt(data: any): string {
  const {
    purpose = PromptDefaults.purpose,
    layout = PromptDefaults.layout,
    color = PromptDefaults.color,
    tone = PromptDefaults.tone,
    font = PromptDefaults.font,
    language = PromptDefaults.language,
    rawPrompt,
  } = data;

  const parts = [
    `Purpose: ${purpose}`,
    `Layout: ${layout.join(", ")}`,
    `Color: ${color}`,
    `Tone: ${tone}`,
    `Font: ${font}`,
    `Language: ${language}`,
  ];

  if (rawPrompt) parts.push(`Additional Instructions: ${rawPrompt}`);

  return parts.join("\n");
}
