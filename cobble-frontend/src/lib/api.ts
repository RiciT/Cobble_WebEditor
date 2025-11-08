import axios from "axios";

export async function runSource(source: string, stdin: string) {
  // change base URL if your backend differs
  const base = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";
  const res = await axios.post(`${base}/run`, { source, stdin }, { timeout: 15000 });
  // expect { stdout, stderr, exitCode }
  return res.data as { stdout: string; stderr: string; exitCode: number };
}