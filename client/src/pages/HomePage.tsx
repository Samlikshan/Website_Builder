import { useState } from "react";
import { PromptForm } from "../feature/prompt/components/PrompForm";

const HomePage = () => {
  const [html, setHtml] = useState("");

  const hasGenerated = !!html;

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          AI Website Builder
        </h1>

        <div
          className={`transition-all duration-300 ${
            hasGenerated
              ? "grid grid-cols-1 lg:grid-cols-2 gap-10"
              : "flex justify-center"
          }`}
        >
          <div className={`${hasGenerated ? "" : "w-full max-w-xl"}`}>
            <PromptForm onGenerated={setHtml} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
