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
            <PromptForm
              onGenerated={(html, css) => {
                setHtml(html);
                setCss(css);
              }}
            />
            {hasGenerated && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleEditInBuilder}
                  className="bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition"
                >
                  Edit in Builder
                </button>
              </div>
            )}
          </div>
          {hasGenerated && (
            <div>
              <PreviewPane html={html} css={css} />
            </div>
          )}{" "}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
