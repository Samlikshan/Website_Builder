import fs from "fs";
import path from "path";

const logsDir = path.join(__dirname, "../../logs");
const logFilePath = path.join(logsDir, "prompts.log");

export function logPrompt(prompt: string, source: string = "groq") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] (${source.toUpperCase()}) ${prompt}\n`;

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  console.log(`${logEntry.trim()}`);

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Failed to write to prompts.log:", err);
    }
  });
}

import { createLogger, transports, format } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
