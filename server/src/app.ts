import express from "express";
import cors from "cors";
import groqRoutes from "./interface/routes/groqRoutes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/generate", groqRoutes);

export default app;
