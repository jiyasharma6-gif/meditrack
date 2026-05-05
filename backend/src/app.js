import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import healthRoutes from "./routes/health.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import expiryRoutes from "./routes/expiry.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://meditrack.vercel.app",
    /\.vercel\.app$/
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/expiry", expiryRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;

