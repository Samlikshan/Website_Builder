import cors from "cors";

const whitelist = process.env.CORS_WHITELIST;

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    const isDev = process.env.NODE_ENV !== "production";

    if (!origin || origin === whitelist || isDev) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST"],
};

export default corsOptions;
