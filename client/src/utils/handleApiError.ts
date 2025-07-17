import { toast } from "sonner";

export function handleApiError(err: unknown, fallback = "An error occurred") {
  const message = err instanceof Error ? err.message : fallback;
  toast.error(message);
  console.error("API Error:", err);
}
