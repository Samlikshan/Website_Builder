import axios from "axios";

export async function callGroqAPI(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  const apiUrl = process.env.GROQ_API_URL;
  const llmModel = process.env.LLM_MODEL;
  if (!apiKey) throw new Error("Missing GROQ_API_KEY in environment");
  if (!apiUrl) throw new Error("Missing GROQ_API_URL in environment");
  if (!llmModel) throw new Error("Missing LLM_MODEL in environment");

  const systemMessage = `
You are a helpful assistant that generates clean, responsive HTML and CSS code for website builders like GrapesJS.
Follow these rules:
- Output only HTML and CSS (no JS unless requested).
- Use section and div elements with clear class names.
- Make styles modular (can be edited later).c
- The layout should be based on the user’s request.
`;

  const response = await axios.post(
    apiUrl,
    {
      model: llmModel,
      temperature: 1,
      top_p: 1,
      messages: [
        { role: "system", content: systemMessage },
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
  if (!content) throw new Error("Groq API returned no content");

  return content;
}
