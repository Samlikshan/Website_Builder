import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { createHttpError } from "../../httpError";

export async function callOpenAI(
  prompt: string,
  systemPrompt = "You are a helpful assistant."
): Promise<string> {
  const token = process.env.OPENAI_API_KEY;
  const endpoint =
    process.env.OPENAI_API_URL || "https://models.github.ai/inference";
  const model = process.env.OPENAI_LLM_MODEL || "openai/gpt-4.1";

  if (!token) throw new Error("Missing GITHUB_TOKEN in environment");

  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const content = response.body.choices?.[0]?.message?.content;
  if (!content) throw createHttpError("OpenAI API returned no content", 400);
  return content;
}
