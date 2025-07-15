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
