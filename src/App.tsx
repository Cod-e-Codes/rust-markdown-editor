import React, { useState } from "react";
import "./App.css";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [markdown, setMarkdown] = useState("");
  const [preview, setPreview] = useState("");

  const handleMarkdownChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    setMarkdown(input);
    const html = await invoke<string>("parse_markdown", { input });
    setPreview(html);
  };

  return (
    <div className="app">
      <textarea
        className="editor"
        value={markdown}
        onChange={handleMarkdownChange}
        placeholder="Enter Markdown here..."
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  );
}

export default App;
