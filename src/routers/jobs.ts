import { getAllJobs } from "@/controllers/job.js";
import { authenticate } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getAllJobs);

export default router;
