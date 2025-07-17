export function createHttpError(message: string, status = 400, type?: string) {
  const err = new Error(message) as any;
  err.status = status;
  if (type) err.type = type;
  return err;
}
