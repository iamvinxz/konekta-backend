import { Router } from "express";
import authRoutes from "@/routers/auth.js";
import jobRoutes from "@/routers/jobs.js";
import companyRoutes from "@/routers/companies.js";
import userRoutes from "@/routers/users.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/jobs", jobRoutes);
router.use("/companies", companyRoutes);
router.use("/users", userRoutes);

export default router;
