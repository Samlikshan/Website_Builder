import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

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

    // Wait for editor to load before appending custom UI
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

        const checkboxLabel = document.createElement("label");
        checkboxLabel.style.display = "flex";
        checkboxLabel.style.alignItems = "center";
        checkboxLabel.style.gap = "6px";
        checkboxLabel.style.fontSize = "12px";
        checkboxLabel.style.marginBottom = "10px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.append("Apply to all sections");

        const buttonRow = document.createElement("div");
        buttonRow.style.display = "flex";
        buttonRow.style.justifyContent = "space-between";

        const improveBtn = document.createElement("button");
        improveBtn.innerText = "✨ Improve";
        Object.assign(improveBtn.style, {
          background: "transparent",
          color: "#ccc",
          border: "1px solid #444",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        });

        const generateBtn = document.createElement("button");
        generateBtn.innerText = "Generate";
        Object.assign(generateBtn.style, {
          background: "#555",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        });

        generateBtn.onclick = async () => {
          const prompt = textarea.value.trim();
          if (!prompt) return;

          generateBtn.innerText = "Thinking...";
          generateBtn.disabled = true;

          try {
            const res = await fetch("http://localhost:5000/api/ai-generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            const wrapper = editor.DomComponents.getWrapper();
            wrapper.append(data.html);

            textarea.value = "";
          } catch (err) {
            alert("Something went wrong.");
          } finally {
            generateBtn.innerText = "Generate";
            generateBtn.disabled = false;
          }
        };

        buttonRow.appendChild(improveBtn);
        buttonRow.appendChild(generateBtn);

        section.appendChild(title);
        section.appendChild(textarea);
        section.appendChild(checkboxLabel);
        section.appendChild(buttonRow);

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
