import axios from "axios";
import { createHttpError } from "../../httpError";

export async function callGroq(
  prompt: string,
  systemPrompts: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  const apiUrl = process.env.GROQ_API_URL;
  const llmModel = process.env.LLM_MODEL;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY in environment");
  if (!apiUrl) throw new Error("Missing GROQ_API_URL in environment");
  if (!llmModel) throw new Error("Missing LLM_MODEL in environment");

  const response = await axios.post(
    apiUrl,
    {
      model: llmModel,
      temperature: 1,
      top_p: 1,
      messages: [
        { role: "system", content: systemPrompts },
        { role: "user", content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  const content = response.data.choices?.[0]?.message?.content;
  if (!content) throw createHttpError("Groq API returned no content", 400);
  console.log(content);
  return content;
}
