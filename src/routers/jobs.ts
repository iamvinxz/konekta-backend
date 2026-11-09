import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  getJobsPerCompany,
} from "@/controllers/job.js";
import { authenticate } from "@/middlewares/auth.js";
import employerPage from "@/middlewares/rolecheck.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getAllJobs);
router.get("/:id", authenticate, getJobById);
router.get("/companies/:id/jobs", authenticate, getJobsPerCompany);
router.post("/", authenticate, employerPage, createJob);
router.delete("/:id", authenticate, employerPage, deleteJob);

export default router;
