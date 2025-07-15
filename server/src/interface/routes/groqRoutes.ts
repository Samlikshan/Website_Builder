import { Router } from "express";
import { generateHandler } from "../controllers/groqController";

const router = Router();
router.post("/", generateHandler);

export default router;
