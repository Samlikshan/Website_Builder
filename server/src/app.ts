import express from "express";
import cors from "cors";
import groqRoutes from "./interface/routes/groqRoutes";
import { errorHandler } from "./middleware/ErrorHandler";
import morgan from "morgan";
import logger from "./utils/logger";
import corsOptions from "./config/cors";

const app = express();

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/generate", groqRoutes);

app.use(errorHandler);
export default app;
