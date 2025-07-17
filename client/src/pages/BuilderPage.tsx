import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { updateBuilderContent } from "../lib/generete";
import { handleApiError } from "../utils/handleApiError";

const BuilderPage = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const html = useSelector((state: RootState) => state.builder.html);
  const css = useSelector((state: RootState) => state.builder.css);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      height: "100vh",
      width: "100%",
      storageManager: false,
      components: html || "<h1>Start Designing...</h1>",
      style: css || "",
    });

    editor.on("load", () => {
      const styleSidebar = document.querySelector(".gjs-sm-sectors");
      if (styleSidebar) {
        const section = document.createElement("div");
        section.style.borderTop = "1px solid #444";
        section.style.padding = "12px";
        section.style.background = "#2c2c2c";
        section.style.color = "#eee";
        section.style.marginTop = "10px";
        section.style.fontFamily = "sans-serif";

        const title = document.createElement("h4");
        title.innerText = "AI Edit";
        title.style.marginBottom = "10px";
        title.style.fontSize = "14px";

        const textarea = document.createElement("textarea");
        textarea.placeholder =
          "Describe your changes - it's purpose, style preferences...";
        textarea.rows = 3;
        textarea.style.width = "100%";
        textarea.style.padding = "8px";
        textarea.style.borderRadius = "4px";
        textarea.style.border = "1px solid #555";
        textarea.style.background = "#1f1f1f";
        textarea.style.color = "#eee";
        textarea.style.marginBottom = "10px";

        const providerSelect = document.createElement("select");
        providerSelect.style.width = "100%";
        providerSelect.style.marginBottom = "10px";
        providerSelect.style.padding = "6px";
        providerSelect.style.borderRadius = "4px";
        providerSelect.style.background = "#1f1f1f";
        providerSelect.style.color = "#eee";
        providerSelect.style.border = "1px solid #555";

        const groqOption = document.createElement("option");
        groqOption.value = "groq";
        groqOption.text = "Groq (LLaMA 3.3)";
        const openaiOption = document.createElement("option");
        openaiOption.value = "openai";
        openaiOption.text = "OpenAI (GPT-4.1)";

        providerSelect.appendChild(openaiOption);
        providerSelect.appendChild(groqOption);

        const generateBtn = document.createElement("button");
        generateBtn.innerText = "Generate";
        Object.assign(generateBtn.style, {
          background: "#555",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        });

        generateBtn.onclick = async () => {
          const prompt = textarea.value.trim();
          const provider = providerSelect.value as "groq" | "openai";

          if (!prompt) return;

          const currentHtml = editor.getHtml();
          const currentCss = editor.getCss() || "";

          generateBtn.innerText = "Thinking...";
          generateBtn.disabled = true;

          try {
            const { html, css } = await updateBuilderContent({
              prompt,
              html: currentHtml,
              css: currentCss,
              provider,
            });

            editor.setComponents(html || "");
            editor.setStyle(css || "");
            textarea.value = "";
          } catch (err) {
            console.log(err);
            handleApiError(err);
          } finally {
            generateBtn.innerText = "Generate";
            generateBtn.disabled = false;
          }
        };

        section.appendChild(title);
        section.appendChild(textarea);
        section.appendChild(providerSelect);
        section.appendChild(generateBtn);
        styleSidebar.appendChild(section);
      }
    });

    return () => editor.destroy();
  }, [html, css]);

  return (
    <div style={{ display: "flex" }}>
      <div ref={editorRef} id="gjs" style={{ flexGrow: 1 }} />
    </div>
  );
};

export default BuilderPage;
