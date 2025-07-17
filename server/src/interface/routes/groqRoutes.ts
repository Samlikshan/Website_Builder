import { Router } from "express";
import {
  generateHandler,
  generateUpdateHandler,
} from "../controllers/groqController";

const router = Router();
router.post("/", generateHandler);
router.post("/update", generateUpdateHandler);

export default router;
