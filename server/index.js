// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173",                // local frontend
    "https://service-portal-ten.vercel.app" // deployed frontend
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
}));

// Preflight requests
//app.options("/*", cors());

app.use(express.json());
app.use("/api", customerRoutes);

// Test endpoint
app.get("/", (req, res) => res.send("Server Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));