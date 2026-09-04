import express from "express";
import authRoutes from "./routes/auth.js";
import {
  apiRateLimiter,
  errorHandler,
  securityHeaders,
} from "./middleware/index.js";
const app = express();
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(
  express.json({
    limit: "1mb",
  }),
);
app.use(
  express.urlencoded({
    extended: false,
    limit: "1mb",
  }),
);
app.use(apiRateLimiter);
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "build-me-api",
  });
});
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);
export default app;
