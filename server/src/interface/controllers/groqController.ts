import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";
import { createHttpError } from "../../utils/httpError";
import { buildFinalPrompt } from "../../utils/buildPrompt";
import { generateHTML } from "../../core/usecases/generateHtmlUseCase";
import { callAI } from "../../utils/ai";
import { updateHTML } from "../../core/usecases/updateHtmlUseCase";

export async function generateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      rawPrompt,
      provider,
      purpose,
      layout,
      color,
      tone,
      font,
      language,
    } = req.body;

    if (!rawPrompt || typeof rawPrompt !== "string") {
      throw createHttpError("Prompt is required", 400);
    }
    if (!provider || !["openai", "groq"].includes(provider)) {
      throw createHttpError(
        "Valid AI provider is required (openai or groq)",
        400
      );
    }

    const vaguenessPrompt = `
      Analyze this website request: "${rawPrompt}"
      Is this sufficient to generate a basic single-page website?
      Consider it SPECIFIC if:
      - It describes a website purpose/service/product
      - It's more than 10 words
      
      If vague, return: { "isVague": true }
      If specific, return: { "isVague": false }
      Respond ONLY in JSON format.
    `;

    try {
      const systemPrompt =
        "You are an expert web design assistant creating single-page websites. Focus on minimal requirements and avoid detailed feature questions.";
      const vaguenessResponse = await callAI(
        vaguenessPrompt,
        systemPrompt,
        provider
      );

      let cleanedResponse = vaguenessResponse
        .replace(/^```json\n/, "")
        .replace(/^```/, "")
        .replace(/\n```$/, "")
        .trim();

      let vaguenessResult;
      try {
        vaguenessResult = JSON.parse(cleanedResponse);
      } catch (e) {
        return res.status(200).json({
          type: "clarification",
          message: "Unable to analyze prompt due to invalid AI response.",
          questions: [
            "What is the general purpose of your website?",
            "Who is the target audience for your website?",
            "Do you have any basic design preferences (e.g., color scheme or tone)?",
          ],
          originalPrompt: rawPrompt,
        });
      }

      if (vaguenessResult.isVague) {
        return res.status(200).json({
          type: "clarification",
          message:
            "We need a bit more information to create your single-page website.",
          questions: [
            "What is the general purpose of your website?",
            "Who is the target audience for your website?",
            "Do you have any basic design preferences (e.g., color scheme or tone)?",
          ],
          originalPrompt: rawPrompt,
        });
      }

      const finalPrompt = buildFinalPrompt({
        ...req.body,
        rawPrompt: rawPrompt,
      });

      const { html, css } = await generateHTML(finalPrompt, provider);
      return res.status(200).json({
        html,
        css,
        message: `Single-page website generated using ${provider}`,
      });
    } catch (error) {
      const err = error as AxiosError;
      console.error("AI call error:", err);
      let message = "Failed to process prompt";
      let status = 500;

      if (err.response?.status === 429) {
        message = `Rate limit exceeded for ${provider}. Try switching to ${
          provider === "groq" ? "OpenAI" : "Groq"
        } or waiting a few minutes.`;
        status = 429;
      } else if (err.response?.status === 401) {
        message = `Invalid API key for ${provider}. Please contact support.`;
        status = 401;
      } else if (err.response?.status === 400) {
        message = `Invalid request to ${provider}. Please refine your prompt.`;
        status = 400;
      }

      return res.status(status).json({ message });
    }
  } catch (error) {
    console.error("Handler error:", error);
    next(error);
  }
}

export async function generateUpdateHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { prompt, html, css, provider } = req.body;

    if (!prompt || !html) {
      return res
        .status(400)
        .json({ error: "Prompt and existing HTML are required" });
    }

    const result = await updateHTML({ prompt, html, css, provider });
    return res.status(200).json(result);
  } catch (error) {
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
