import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Toggle } from "./ui/toggle";
import { Sparkles, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { generateHTML } from "../../../lib/generete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBuilderContent } from "../../../store/builderSlice";

type ErrorsType = {
  description?: string;
  aiProvider?: string;
  purpose?: string;
  selectedSections?: string;
  selectedPalette?: string;
};
const purposeOptions = [
  "Portfolio",
  "Blog",
  "Course Selling",
  "E-commerce",
  "Landing Page",
  "Other",
];

const sectionOptions = [
  "Hero",
  "Features",
  "Testimonials",
  "FAQ",
  "Contact",
  "About",
  "Pricing",
];

const colorPalettes = [
  { name: "Ocean", colors: ["#3B82F6", "#1E40AF", "#1E3A8A"] },
  { name: "Forest", colors: ["#10B981", "#059669", "#047857"] },
  { name: "Sunset", colors: ["#F59E0B", "#D97706", "#B45309"] },
  { name: "Rose", colors: ["#EF4444", "#DC2626", "#B91C1C"] },
  { name: "Purple", colors: ["#8B5CF6", "#7C3AED", "#6D28D9"] },
  { name: "Minimal", colors: ["#6B7280", "#4B5563", "#374151"] },
];

const fontOptions = ["Inter", "Sora", "DM Sans"];

export const WebsiteBuilder = () => {
  const [description, setDescription] = useState("");
  const [aiProvider, setAiProvider] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState("");
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [clarification, setClarification] = useState(null);
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors: ErrorsType = {};
    if (!description || description.length < 10) {
      errors.description = "Description must be at least 10 characters";
    }
    if (!aiProvider) {
      errors.aiProvider = "Please select an AI provider";
    }
    if (!purpose) {
      errors.purpose = "Please select a website purpose";
    }
    if (selectedSections.length === 0) {
      errors.selectedSections = "Please select at least one section";
    }
    if (!selectedPalette) {
      errors.selectedPalette = "Please select a color palette";
    }
    return errors;
  };

  const toggleSection = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleGenerate = async () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the form errors before generating");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateHTML({
        purpose,
        layout: selectedSections,
        color: selectedPalette,
        tone: "professional",
        font: selectedFont,
        provider: aiProvider,
        language: "en",
        rawPrompt: description,
      });

      if ("type" in result && result.type === "clarification") {
        setClarification({
          message: result.message,
          questions: result.questions || [],
          originalPrompt: result?.originalPrompt,
        });

        return;
      }

      if ("html" in result && "css" in result) {
        dispatch(setBuilderContent({ html: result.html, css: result.css }));
        navigate("/builder");
        toast.success("Website generated successfully!");
      }
    } catch (err) {
      toast.error("Generation failed. Please try again.");
      console.error("Generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-lg border-0 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="space-y-6">
            {/* Clarification Panel */}
            {clarification && (
              <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 mb-2">
                  {clarification.message}
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700">
                  {clarification.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-gray-600">
                  Refine your description and try again.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setClarification(null)}
                  className="mt-2 text-xs"
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Describe your website idea
                {errors.description && (
                  <span className="ml-2 text-red-500 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </span>
                )}
              </label>
              <Textarea
                placeholder="E.g., A modern portfolio for a UX designer with dark theme and animated sections..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`min-h-[100px] resize-none border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } focus:ring-primary`}
              />
              <p className="text-xs text-gray-500">
                Tip: Include tone, style, and audience for better results.
              </p>
            </div>

            {/* AI Provider & Font */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  AI Provider
                  {errors.aiProvider && (
                    <span className="ml-2 text-red-500 text-xs flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.aiProvider}
                    </span>
                  )}
                </label>
                <Select value={aiProvider} onValueChange={setAiProvider}>
                  <SelectTrigger
                    className={`h-9 ${
                      errors.aiProvider ? "border-red-500" : "border-gray-300"
                    } focus:ring-primary`}
                  >
                    <SelectValue placeholder="Choose provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="groq">Groq</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Typography
                </label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger className="h-9 border-gray-300 focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Website Purpose
                {errors.purpose && (
                  <span className="ml-2 text-red-500 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.purpose}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {purposeOptions.map((option) => (
                  <Button
                    key={option}
                    size="sm"
                    variant={purpose === option ? "default" : "outline"}
                    onClick={() => setPurpose(option)}
                    className="h-8 text-xs"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Page Sections
                {errors.selectedSections && (
                  <span className="ml-2 text-red-500 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.selectedSections}
                  </span>
                )}
              </label>
              <div className="flex flex-wrap gap-2">
                {sectionOptions.map((section) => (
                  <Toggle
                    key={section}
                    pressed={selectedSections.includes(section)}
                    onPressedChange={() => toggleSection(section)}
                    size="sm"
                    className="h-8 px-3 text-xs data-[state=on]:bg-primary data-[state=on]:text-white"
                  >
                    {section}
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                Color Palette
                {errors.selectedPalette && (
                  <span className="ml-2 text-red-500 text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.selectedPalette}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.name}
                    onClick={() => setSelectedPalette(palette.name)}
                    className={`group flex items-center space-x-1 p-2 rounded-lg border-2 transition-all ${
                      selectedPalette === palette.name
                        ? "border-primary shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex space-x-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              size="lg"
              variant="gradient"
              className="w-full mt-8"
              disabled={isGenerating}
              onClick={handleGenerate}
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate My Website
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
