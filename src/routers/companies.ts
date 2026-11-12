import { createCompany, getCompanies } from "@/controllers/company.js";
import { authenticate } from "@/middlewares/auth.js";
import employerPage from "@/middlewares/rolecheck.js";
import { validateCompany } from "@/middlewares/validation.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getCompanies);
router.post("/", authenticate, employerPage, validateCompany, createCompany);

export default router;
