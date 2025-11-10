import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

// Helper to run shell commands and capture stdout/stderr
function execAsync(command) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      resolve({
        stdout: stdout?.toString() ?? "",
        stderr: stderr?.toString() ?? "",
        exitCode: error?.code ?? 0,
      });
    });
  });
}

// POST /run
app.post("/run", async (req, res) => {
  const source = req.body.source;
  if (!source) return res.status(400).json({ error: "No source code provided" });

  const tempDir = fs.mkdtempSync("/tmp/cobble_");
  const sourceFile = path.join(tempDir, "program.cb");
  fs.writeFileSync(sourceFile, source, "utf8");

  try {
    const dockerCmd = `
      docker run --rm \
        -v ${tempDir}:/workspace \
        --network none \
        --memory=256m \
        --cpus=1 \
        --pids-limit=64 \
        cobble-sandbox \
        sh -c "/usr/local/bin/cobble /workspace/program.cb /workspace/ ; chmod +x /workspace/out ; /workspace/out"
      `;

    const result = await execAsync(dockerCmd);

    res.json(result);
  } catch (err) {
    console.error("Error running code:", err);
    res.json({
      stdout: err.stdout || "",
      stderr: err.stderr || err.message,
      exitCode: err.code ?? -1,
    });
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
