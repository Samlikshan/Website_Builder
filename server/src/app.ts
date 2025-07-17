import express from "express";
import cors from "cors";
import groqRoutes from "./interface/routes/groqRoutes";
import { errorHandler } from "./middleware/ErrorHandler";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", groqRoutes);

app.use(errorHandler);
export default app;
