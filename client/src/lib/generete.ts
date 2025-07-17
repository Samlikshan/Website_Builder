import {
  removeBase64ImagesFromCSS,
  removeImageSrcAttributes,
} from "../utils/cleanAiInputs";
import { axiosInstance } from "./axios";

export type PromptSchema = {
  purpose?: string;
  layout?: string[];
  color?: string;
  tone?: string;
  font?: string;
  language?: string;
  rawPrompt?: string;
};
type HTMLCSSResponse = {
  html: string;
  css: string;
};

type ClarificationResponse = {
  type: "clarification";
  message: string;
  questions?: string[];
};

type GenerateHTMLResponse = HTMLCSSResponse | ClarificationResponse;
export const generateHTML = async (
  data: PromptSchema
): Promise<GenerateHTMLResponse> => {
  const response = await axiosInstance.post<{ html: string; css: string }>(
    "/generate",
    data
  );

  return response.data;
};

interface UpdateRequest {
  prompt: string;
  html: string;
  css: string;
  provider: "groq" | "openai";
}

export const updateBuilderContent = async ({
  prompt,
  html,
  css,
  provider,
}: UpdateRequest) => {
  const cleanedHtml = removeImageSrcAttributes(html);
  const cleanedCss = removeBase64ImagesFromCSS(css);
  const response = await axiosInstance.post("/generate/update", {
    prompt,
    html: cleanedHtml,
    css: cleanedCss,
    provider,
  });

  return response.data;
};
