import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import cors from "cors";
//import { loadAgents, loadAllFiles } from "./routes/customerRoutes.js";
import customerRoutes, { loadAllFiles, loadAgents } from "./routes/customerRoutes.js";
import { createTable } from "./db.js";


const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://service-portal-ten.vercel.app"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));
app.use(express.json());
app.use("/api", customerRoutes);
app.get("/", (req, res) => res.send("Server Running"));

const startServer = async () => {
  try {
    await createTable();     // ensure table exists
    await loadAllFiles();    // load pincodes
    await loadAgents();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server startup failed:", err);
  }
};

startServer();