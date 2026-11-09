import { Router } from "express";
import authRoutes from "@/routers/auth.js";
import jobRoutes from "@/routers/jobs.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);

export default router;
