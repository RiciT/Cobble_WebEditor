import React, { useState } from 'react';
import CodeEditor from "./components/CodeEditor";
import OutputPanel from "./components/OutputPanel";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [output, setOutput] = useState<{stdout: string; stderr: string; exitCode: number} | null>(null);
  const [running, setRunning] = useState(false);
  const [stdin, setStdin] = useState("");
  
  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between p-3 bg-gray-800 bordder-b border-gray-700">
        <h1 className="text-lg font-semibold">Cobble - Web Editor</h1>
        <div className="text-sm text-gray-300">Local dev mode</div>
      </header>

      <Toolbar
        onRun={() =>{
          setRunning(true);
          setOutput(null);
        }}
        running={running}
      />

      <main className="flex-1 flex">
        <div className="flex-1">
          <CodeEditor
            onRunResult={(res: React.SetStateAction<{ stdout: string; stderr: string; exitCode: number; } | null>) => { setOutput(res); setRunning(false); }}
            stdin={stdin}
          />
        </div>
        <div className="w-96 border-l border-gray-700 bg-[#0f1720] flex flex-col">
          <div className="p-2 border-b border-gray-700">
            <label className="text-xs text-gray-400">Program input (stdin)</label>
            <textarea value={stdin} onChange={(e)=>setStdin(e.target.value)}
              className="w-full mt-1 p-2 bg-gray-900 text-white rounded text-sm h-20 resize-none"/>
          </div>
          <OutputPanel output={output}/>
        </div>
      </main>

      <footer className="p-2 text-xs text-gray-400 bg-gray-800 border-t border-gray-700">
        Tip: Press Ctrl+Enter to run. Auto save to localStorage.
      </footer>
    </div>
  );
}
