import axios from "axios";

export async function runSource(source: string/*, stdin: string*/) { //capture stdin: string later
  // change base URL later
  const base = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";
  const res = await axios.post(`${base}/run`, { source/*, stdin*/ }, { timeout: 15000 });
  // expect { stdout, stderr, exitCode }
  return res.data as { stdout: string; stderr: string; exitCode: number };
}