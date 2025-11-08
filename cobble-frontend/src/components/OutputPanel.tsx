import React from "react";

export default function OutputPanel({ output }: { output: { stdout: string; stderr: string; exitCode: number } | null }) {
  if (!output) {
    return <div className="p-3 text-sm text-gray-400">No output yet</div>;
  }
  return (
    <div className="flex-1 p-3 overflow-auto text-sm">
      <div className="mb-3">
        <div className="text-xs text-gray-300">Exit code: <span className="font-mono">{output.exitCode}</span></div>
      </div>
      <div className="mb-2">
        <div className="text-xs text-gray-300">STDOUT</div>
        <pre className="bg-black bg-opacity-40 p-2 rounded text-white whitespace-pre-wrap">{output.stdout || "(empty)"}</pre>
      </div>
      <div>
        <div className="text-xs text-gray-300">STDERR</div>
        <pre className="bg-black bg-opacity-40 p-2 rounded text-red-300 whitespace-pre-wrap">{output.stderr || "(empty)"}</pre>
      </div>
    </div>
  );
}
