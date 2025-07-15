import React, { useState } from "react";
import { generateHTML } from "../../../lib/generete";

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
  { name: "Sunset Orange", value: "sunset", color: "#f97316" },
  { name: "Royal Blue", value: "blue", color: "#3b82f6" },
  { name: "Charcoal Gray", value: "gray", color: "#4b5563" },
  { name: "Deep Black", value: "black", color: "#000" },
  { name: "Minimal White", value: "white", color: "#f3f4f6" },
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

export const PromptForm: React.FC<{ onGenerated: (html: string) => void }> = ({
  onGenerated,
}) => {
  const [rawPrompt, setRawPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clarificationMessage, setClarificationMessage] = useState<
    string | null
  >(null);

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
    setClarificationMessage(null);

    try {
      const html = await generateHTML({ ...answers, rawPrompt });
      onGenerated(html);
    } catch (err) {
      if (err instanceof Error && err?.type === "clarification") {
        setClarificationMessage(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-2 text-center">
        Build your Website with AI
      </h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        Describe your webpage and choose your preferences — we’ll do the rest!
      </p>

      {clarificationMessage && (
        <div className="flex items-start gap-3 mb-4 p-4 bg-gray-100 rounded-md border border-gray-300 shadow-sm">
          <div className="text-2xl">🤖</div>
          <div>
            <p className="text-sm text-gray-800 font-medium mb-1">
              {clarificationMessage}
            </p>
            <p className="text-xs text-gray-500">
              Please answer the following so I can build the best website for
              you.
            </p>
          </div>
        </div>
      )}

      {/* Prompt Textarea */}
      <div className="relative mb-4">
        <textarea
          rows={4}
          className="w-full border rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
          placeholder="e.g. I need a website for my fitness course with testimonials and signup"
          value={rawPrompt}
          onChange={(e) => setRawPrompt(e.target.value)}
        />
        <button
          type="button"
          disabled
          className="absolute bottom-2 left-2 text-xs text-gray-500 px-2 py-1 border rounded border-gray-300"
          title="Coming soon"
        >
          ✨ Improve
        </button>
      </div>

      {/* Purpose */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Purpose</label>
        <div className="flex flex-wrap gap-2">
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
              className={`px-3 py-1 rounded-full border text-sm transition ${
                answers.purpose === cat
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Page Sections</label>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => toggleArrayField("layout", section)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                answers.layout?.includes(section)
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      {/* Color Theme */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Color Theme</label>
        <div className="flex gap-2 mt-1">
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
              className={`w-6 h-6 rounded-full border-2 transition ${
                answers.color === theme.name
                  ? "border-black scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: theme.color }}
              title={theme.name}
            />
          ))}
        </div>
      </div>

      {/* Tone */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tone</label>
        <div className="flex flex-wrap gap-2">
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
              className={`px-3 py-1 rounded-full border text-sm transition ${
                answers.tone === tone
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Language</label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={answers.language || ""}
          onChange={(e) =>
            setAnswers((prev) => ({ ...prev, language: e.target.value }))
          }
        >
          <option value="">Select language</option>
          {languages.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Font */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Font</label>
        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={answers.font || ""}
          onChange={(e) =>
            setAnswers((prev) => ({ ...prev, font: e.target.value }))
          }
        >
          <option value="">Choose font</option>
          {fonts.map((font) => (
            <option key={font}>{font}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
      >
        {loading ? "Generating..." : "Generate Webpage"}
      </button>

      {error && (
        <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
      )}
    </form>
  );
};
