import {
  deleteJob,
  editJob,
  getAllJobs,
  getJobById,
} from "@/controllers/job.js";
import { authenticate } from "@/middlewares/auth.js";
import employerPage from "@/middlewares/rolecheck.js";
import { validateJob } from "@/middlewares/validation.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getAllJobs);
router.get("/:id", authenticate, getJobById);
router.delete("/:id", authenticate, employerPage, deleteJob);
router.patch("/:id", authenticate, employerPage, editJob);

export default router;
