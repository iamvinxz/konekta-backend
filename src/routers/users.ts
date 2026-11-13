import { getUser } from "@/controllers/user.js";
import { authenticate } from "@/middlewares/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", authenticate, getUser);

export default router;
