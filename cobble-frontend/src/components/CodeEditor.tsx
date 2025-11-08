/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { runSource } from "../lib/api";

type RunResult = { stdout: string; stderr: string; exitCode: number } | null;

export default function CodeEditor({ onRunResult, stdin }: { onRunResult: (r: RunResult) => void; stdin: string }) {
  const [code, setCode] = useState<string>(() => {
    return localStorage.getItem("mylang.code") ?? `// Hello — write program here\nexit 0\n`;
  });
  const editorRef = useRef<any>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        triggerRun();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [code, stdin]);

  useEffect(() => {
    const t = setInterval(() => {
      localStorage.setItem("mylang.code", code);
    }, 2000);
    return () => clearInterval(t);
  }, [code]);

  async function triggerRun() {
    setRunning(true);
    onRunResult(null);
    try {
      const res = await runSource(code, stdin);
      onRunResult(res);
    } catch (err: any) {
      onRunResult({ stdout: "", stderr: "Failed to run: " + (err.message ?? err), exitCode: -1 });
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-2 bg-gray-800 border-b border-gray-700">
        <button onClick={triggerRun} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
          {running ? "Running..." : "Run (Ctrl+Enter)"}
        </button>
        <button onClick={() => { localStorage.setItem("mylang.code_backup", code); alert("Saved locally"); }} className="px-3 py-1 bg-gray-700 rounded text-sm">Save</button>
        <button onClick={() => { setCode(localStorage.getItem("mylang.code_backup") ?? ""); }} className="px-3 py-1 bg-gray-700 rounded text-sm">Load</button>
      </div>

      <div className="flex-1">
        <MonacoEditor
          height="100%"
          defaultLanguage="plaintext"
          value={code}
          onChange={(v: any) => setCode(v ?? "")}
          onMount={(editor: any) => { editorRef.current = editor; }}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}