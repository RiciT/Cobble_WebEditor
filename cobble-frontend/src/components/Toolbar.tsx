export default function Toolbar({ onRun, running }: { onRun: (source?: string) => void; running: boolean; }) {
  return (
    <div className="p-2 bg-gray-800 border-b border-gray-700 flex items-center gap-2">
      <button onClick={() => onRun()} className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded disabled:opacity-60" disabled={running}>
        {running ? "Running..." : "Run"}
      </button>
      <div className="text-sm text-gray-300">Status: {running ? "Running" : "Idle"}</div>
    </div>
  );
}