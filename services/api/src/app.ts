import express from "express";

const app = express();

// Disable the X-Powered-By header to prevent leaking framework information
app.disable("x-powered-by");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "build-me-api",
  });
});

export default app;
