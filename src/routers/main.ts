import { Router } from "express";
import authRoutes from "@/routers/auth.js";
import jobRoutes from "@/routers/jobs.js";
import companyRoutes from "@/routers/companies.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/companies", companyRoutes);

export default router;
