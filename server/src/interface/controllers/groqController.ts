import { NextFunction, Request, Response } from "express";
import { isPromptVague } from "../../utils/prompChecker";
import { followUpQuestions } from "../../constants/followUpQuestions";
import { buildFinalPrompt } from "../../utils/buildPrompt";
import { generateHTML } from "../../core/usecases/generateHtmlUseCase";
import { updateHTML } from "../../core/usecases/updateHtmlUseCase";
import { createHttpError } from "../../utils/httpError";
import axios, { AxiosError } from "axios";

export async function generateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { rawPrompt } = req.body;

    if (!rawPrompt || typeof rawPrompt !== "string") {
      throw createHttpError("Prompt is required", 400);
    }

    if (isPromptVague(req.body)) {
      return res.status(200).json({
        type: "clarification",
        message: "We need a bit more information to help you better.",
        questions: [
          "What is the purpose of this component or page?",
          "Do you have any preferred color scheme or design style?",
          "What kind of tone or feel should it have? (e.g., playful, professional)",
          "Will this be used for a landing page, dashboard, or something else?",
        ],
        originalPrompt: rawPrompt,
      });
    }

    const finalPrompt = buildFinalPrompt(req.body);
    const { html, css } = await generateHTML(finalPrompt);

    return res.status(200).json({ html, css });
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (err.response?.status === 429) {
      return next(
        createHttpError(
          "Too many requests to AI. Please try again after some time.",
          429
        )
      );
    }

    next(error);
  }
}

export async function generateUpdateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { prompt, html, css } = req.body;

    if (!prompt || !html) {
      return res
        .status(400)
        .json({ error: "Prompt and existing HTML are required" });
    }

    const result = await updateHTML({ prompt, html, css });
    return res.status(200).json(result);
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (err.response?.status === 429) {
      return next(
        createHttpError(
          "Too many requests to AI. Please try again after some time.",
          429
        )
      );
    }

    next(error);
  }
}
