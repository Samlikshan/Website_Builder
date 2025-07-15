import React, { useState } from "react";
import axios from "axios";

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

const languages = ["English", "Spanish", "German", "French", "Hindi"];

export const PromptForm: React.FC<{ onGenerated: (html: string) => void }> = ({
  onGenerated,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [language, setLanguage] = useState("English");
  const [rawPrompt, setRawPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const promptData: PromptSchema = {
      purpose: selectedCategory || undefined,
      color: selectedColor || undefined,
      language,
      rawPrompt,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate",
        promptData
      );
      onGenerated(res.data.html);
    } catch (error) {
      console.log(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg border max-w-2xl w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Build your Website with AI
      </h2>

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === selectedCategory ? null : cat)
            }
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selectedCategory === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompt Box */}
      <div className="relative mb-4">
        <textarea
          rows={4}
          className="w-full border rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
          placeholder="Describe your webpage - it's purpose, section layout, specific features you want to showcase..."
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

      {/* Language + Color Theme */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">
            Webpage Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Color Theme</label>
          <div className="flex items-center gap-2 mt-1">
            {colorThemes.map((theme) => (
              <button
                key={theme.value}
                type="button"
                onClick={() =>
                  setSelectedColor(
                    selectedColor === theme.name ? null : theme.name
                  )
                }
                className={`w-6 h-6 rounded-full border-2 transition ${
                  selectedColor === theme.name
                    ? "border-black scale-110"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: theme.color }}
                title={theme.name}
              />
            ))}
          </div>
        </div>
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
