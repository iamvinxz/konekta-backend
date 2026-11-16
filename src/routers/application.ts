import {
  createApplication,
  getApplications,
  withdrawApplication,
} from "@/controllers/application.js";
import { authenticate } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getApplications);
router.post("/:jobId/apply", authenticate, createApplication);
router.patch("/:applicationId/withdraw", authenticate, withdrawApplication);

export default router;
