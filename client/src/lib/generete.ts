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

export const generateHTML = async (
  data: PromptSchema
): Promise<{ html: string; css: string }> => {
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
}

export const updateBuilderContent = async ({
  prompt,
  html,
  css,
}: UpdateRequest) => {
  const response = await axiosInstance.post("/generate/update", {
    prompt,
    html,
    css,
  });

  return response.data;
};
