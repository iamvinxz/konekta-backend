import { getCompanies } from "@/controllers/company.js";
import { authenticate } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getCompanies);

export default router;
