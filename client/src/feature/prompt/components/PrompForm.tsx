import React, { useState } from "react";
import { generateHTML } from "../../../lib/generete";
import ClarificationPanel from "./ClarificationPanel";
import { Sparkles, Wand2, Palette, Type, Globe, Layout } from "lucide-react";
import { handleApiError } from "../../../utils/handleApiError";

type PromptSchema = {
  purpose?: string;
  layout?: string[];
  color?: string;
  tone?: string;
  font?: string;
  language?: string;
  rawPrompt?: string;
};

const categories = [
  "Health & Fitness",
  "Finance",
  "Meditation",
  "Course Selling",
  "Live Workshop Selling",
  "VSL Funnel",
  "1-On-1 Consultation",
];

const colorThemes = [
  {
    name: "Sunset Orange",
    value: "sunset",
    color: "#f97316",
    gradient: "from-orange-400 to-red-500",
  },
  {
    name: "Royal Blue",
    value: "blue",
    color: "#3b82f6",
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    name: "Charcoal Gray",
    value: "gray",
    color: "#4b5563",
    gradient: "from-gray-400 to-gray-600",
  },
  {
    name: "Deep Black",
    value: "black",
    color: "#000",
    gradient: "from-gray-800 to-black",
  },
  {
    name: "Minimal White",
    value: "white",
    color: "#f3f4f6",
    gradient: "from-gray-100 to-white",
  },
];

const tones = ["Professional", "Minimalist", "Playful", "Bold", "Clean"];
const sections = [
  "Hero",
  "Features",
  "Testimonials",
  "Pricing",
  "FAQ",
  "Contact",
];
const fonts = ["Open Sans", "Inter", "Lato", "Roboto", "Poppins"];
const languages = ["English", "Spanish", "German", "French", "Hindi"];

export const PromptForm: React.FC<{
  onGenerated: (html: string, css: string) => void;
}> = ({ onGenerated }) => {
  const [rawPrompt, setRawPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clarification, setClarification] = useState<{
    message: string;
    questions: string[];
  } | null>(null);

  const [answers, setAnswers] = useState<PromptSchema>({
    purpose: "",
    layout: [],
    color: "",
    tone: "",
    font: "",
    language: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setClarification(null);

    try {
      const result = await generateHTML({ ...answers, rawPrompt });

      if ("type" in result && result.type === "clarification") {
        setClarification({
          message: result.message,
          questions: result.questions || [],
        });
        return;
      }

      if ("html" in result && "css" in result) {
        onGenerated(result.html, result.css);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        handleApiError(err);
      } else {
        console.log(err);
        setError("Unknown error occurred.");
      }
    }
  };

  const toggleArrayField = (key: keyof PromptSchema, value: string) => {
    const current = (answers[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setAnswers((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20 w-full"
      >
        {clarification && (
          <div className="mb-6">
            <ClarificationPanel
              message={clarification.message}
              questions={clarification.questions}
            />
          </div>
        )}

        {/* Prompt Textarea */}
        <div className="relative mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Wand2 className="w-4 h-4" />
            Describe Your Website
          </label>
          <div className="relative">
            <textarea
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50/50 placeholder-gray-400"
              placeholder="e.g. I need a modern fitness course website with video testimonials, pricing tiers, and a sleek signup form..."
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value)}
            />
            <button
              type="button"
              disabled
              className="absolute bottom-3 right-3 text-xs text-gray-400 px-3 py-1.5 border border-gray-200 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-gray-50 transition-colors"
              title="Coming soon"
            >
              <Sparkles className="w-3 h-3 inline mr-1" />
              Enhance
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Purpose */}
          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Layout className="w-4 h-4" />
              Website Purpose
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      purpose: prev.purpose === cat ? "" : cat,
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                    answers.purpose === cat
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Layout className="w-4 h-4" />
              Page Sections
            </label>
            <div className="flex flex-wrap gap-1.5">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => toggleArrayField("layout", section)}
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                    answers.layout?.includes(section)
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Color Theme */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Palette className="w-4 h-4" />
              Color Theme
            </label>
            <div className="flex gap-3 mt-1">
              {colorThemes.map((theme) => (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      color: prev.color === theme.name ? "" : theme.name,
                    }))
                  }
                  className={`relative w-12 h-12 rounded-xl border-3 transition-all duration-200 ${
                    answers.color === theme.name
                      ? "border-gray-800 scale-110 shadow-lg"
                      : "border-gray-200 hover:border-gray-400 hover:scale-105"
                  }`}
                  style={{ backgroundColor: theme.color }}
                  title={theme.name}
                >
                  {answers.color === theme.name && (
                    <div className="absolute inset-0 rounded-xl bg-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Wand2 className="w-4 h-4" />
              Design Tone
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tones.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({
                      ...prev,
                      tone: prev.tone === tone ? "" : tone,
                    }))
                  }
                  className={`px-3 py-1.5 rounded-lg border-2 text-xs font-medium transition-all duration-200 ${
                    answers.tone === tone
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Globe className="w-4 h-4" />
              Language
            </label>
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 transition-all duration-200"
              value={answers.language || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, language: e.target.value }))
              }
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Font */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Type className="w-4 h-4" />
              Typography
            </label>
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 transition-all duration-200"
              value={answers.font || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, font: e.target.value }))
              }
            >
              <option value="">Choose font</option>
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading || !rawPrompt.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating Your Website...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate My Website
              </span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm text-center font-medium">
              {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
