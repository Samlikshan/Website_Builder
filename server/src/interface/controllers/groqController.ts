import { Request, Response } from "express";
import { isPromptVague } from "../../utils/prompChecker";
import { followUpQuestions } from "../../constants/followUpQuestions";
import { buildFinalPrompt } from "../../utils/buildPrompt";
import { generateHTML } from "../../core/usecases/generateHtml";
import { updateHTML } from "../../core/usecases/updateHtmlUseCase";

export async function generateHandler(req: Request, res: Response) {
  try {
    const { rawPrompt } = req.body;

    if (!rawPrompt || typeof rawPrompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (isPromptVague(req.body)) {
      return res.status(400).json({
        type: "clarification",
        message: "Your prompt is too vague. Please answer a few questions.",
        questions: followUpQuestions,
      });
    }

    const finalPrompt = buildFinalPrompt(req.body);
    const { html, css } = await generateHTML(finalPrompt);

    return res.status(200).json({ html, css });
  } catch (err) {
    console.error("Error in generateHandler:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function generateUpdateHandler(req: Request, res: Response) {
  try {
    const { prompt, html, css } = req.body;

    if (!prompt || !html) {
      return res
        .status(400)
        .json({ error: "Prompt and existing HTML are required" });
    }

    const result = await updateHTML({ prompt, html, css });
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error in generateUpdateHandler:", err);
    return res.status(500).json({ error: "Update failed" });
  }
}
