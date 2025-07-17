import { useState } from "react";
import { PromptForm } from "../feature/prompt/components/PrompForm";
import { PreviewPane } from "../feature/preview/components/PreviewPane";
import { useNavigate } from "react-router-dom";
import { setBuilderContent } from "../store/builderSlice";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasGenerated = !!html;

  const handleEditInBuilder = () => {
    dispatch(setBuilderContent({ html, css }));
    navigate("/builder");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Fixed Center Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 mb-4">
            <span className="text-sm font-medium text-blue-700">
              ✨ AI Website Builder
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Create Your Dream Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
            Describe your vision and let our AI craft a beautiful, professional
            website tailored to your needs.
          </p>
        </div>

        <div
          className={`transition-all duration-300 ${
            hasGenerated
              ? "grid grid-cols-1 lg:grid-cols-2 gap-10"
              : "flex justify-center"
          }`}
        >
          <div className={`${hasGenerated ? "" : "w-full max-w-xl"}`}>
            <PromptForm
              onGenerated={(html, css) => {
                setHtml(html);
                setCss(css);
              }}
            />
          </div>

          {hasGenerated && (
            <div className="lg:sticky top-6 h-full">
              <div className="bg-white border rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                {/* Button on top */}
                <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Preview
                  </h2>
                  <button
                    onClick={handleEditInBuilder}
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition text-sm"
                  >
                    ✏️ Edit in Builder
                  </button>
                </div>
                <div className="px-6 pb-2 text-sm text-gray-500">
                  Your generated webpage
                </div>
                <div className="flex-grow">
                  <PreviewPane html={html} css={css} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
