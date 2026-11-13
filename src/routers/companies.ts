import {
  createCompany,
  deleteCompany,
  getCompanies,
} from "@/controllers/company.js";
import { createJob, getJobsPerCompany } from "@/controllers/job.js";
import { authenticate } from "@/middlewares/auth.js";
import employerPage from "@/middlewares/rolecheck.js";
import { validateCompany, validateJob } from "@/middlewares/validation.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getCompanies);
router.get("/:id/jobs", authenticate, getJobsPerCompany);
router.post("/", authenticate, employerPage, validateCompany, createCompany);
router.post("/:id/jobs", authenticate, employerPage, validateJob, createJob);
router.delete("/:id", authenticate, employerPage, deleteCompany);

export default router;
