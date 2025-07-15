import { Request, Response } from "express";
import { generateHTML } from "../../core/usecases/generateHtml";

export async function generateHandler(req: Request, res: Response) {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const html = await generateHTML(prompt);
    return res.status(200).json({ html });
  } catch (err) {
    console.error("Error in getting response:", err);
    return res.status(500).json({
      error: "Failed to generate HTML,Please try again after some time",
    });
  }
}
