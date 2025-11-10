/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import cors from "cors";
import fs from "fs";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const app = express();
const PORT = 8080;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

const execFileAsync = promisify(execFile);

// Routes
app.post("/run", async (req, res) => {
  const source = req.body.source;
  if (!source) { return res.status(400).json({ error: "Bad Request: No source code"})}
  const nameAddOn = Date.now();
  const folder = "../programs/";
  const tempSourceFile = `out${nameAddOn}.cb`;

  fs.writeFileSync(folder + tempSourceFile, source, "utf8");

  try {
    //Running compiler
    const compiledFile = folder + tempSourceFile.substring(0, tempSourceFile.length - 3);
    const compilerPath = "../../../Cobble_Compiler/cmake-build-debug/cobble";
    
    await execFileAsync(compilerPath, [folder + tempSourceFile, "../programs/", nameAddOn]);

    const {stdout, stderr, exitCode} = await execFileAsync(compiledFile)
  
    console.log("Received source:", req.body.source);
    res.json({ stdout: stdout, stderr: stderr, exitCode: exitCode });

    fs.unlink(tempSourceFile, () => {});
    fs.unlink(compiledFile, () => {});
  } catch (err) {
    console.error("Error running code:", err);
    res.json({
      stdout: err.stdout || "",
      stderr: err.stderr || err.message,
      exitCode: err.code ?? -1,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});