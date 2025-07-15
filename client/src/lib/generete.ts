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

export const generateHTML = async (data: PromptSchema): Promise<string> => {
  const response = await axiosInstance.post<{ html: string }>(
    "/generate",
    data
  );
  return response.data.html;
};
