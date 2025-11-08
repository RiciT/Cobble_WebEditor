import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

// Allow requests from your frontend (localhost:5173 for Vite)
app.use(cors({
  origin: "http://localhost:5173"
}));

// Optional: parse JSON request bodies
app.use(express.json());

// Routes
app.post("/run", (req, res) => {
  console.log("Received code:", req.body.code);
  res.json({ output: "Program ran successfully." });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});