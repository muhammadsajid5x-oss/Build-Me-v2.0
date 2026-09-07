import { Logger } from "../packages/utils/src/logging/logger";
describe("Application Logging Foundation", () => {
  const logger = new Logger();
  test("creates application log", () => {
    const entry = logger.info("Application started");
    expect(entry.level).toBe("INFO");
    expect(entry.message).toBe("Application started");
    expect(entry.timestamp).toBeDefined();
  });
  test("supports API logs", () => {
    const entry = logger.info("API request completed", {
      service: "api",
      method: "GET",
      path: "/health",
    });
    expect(entry.level).toBe("INFO");
    expect(entry.context).toMatchObject({
      service: "api",
      method: "GET",
      path: "/health",
    });
  });
  test("supports service logs", () => {
    const entry = logger.info("Analytics service processed events", {
      service: "analytics",
    });
    expect(entry.context?.service).toBe("analytics");
  });
  test("supports error logs", () => {
    const entry = logger.error("Request failed", {
      errorCode: "REQUEST_FAILED",
    });
    expect(entry.level).toBe("ERROR");
    expect(entry.context?.errorCode).toBe("REQUEST_FAILED");
  });
  test("supports security logs", () => {
    const entry = logger.security("Authentication attempt failed", {
      reason: "invalid_credentials",
    });
    expect(entry.level).toBe("SECURITY");
    expect(entry.context?.reason).toBe("invalid_credentials");
  });
  test("supports operational logs", () => {
    const entry = logger.operational("Service health check completed", {
      status: "healthy",
    });
    expect(entry.level).toBe("OPERATIONAL");
    expect(entry.context?.status).toBe("healthy");
  });
  test("redacts sensitive values", () => {
    const entry = logger.info("User request", {
      username: "test-user",
      password: "secret-password",
      token: "secret-token",
      apiKey: "secret-api-key",
    });
    expect(entry.context).toMatchObject({
      username: "test-user",
      password: "[REDACTED]",
      token: "[REDACTED]",
      apiKey: "[REDACTED]",
    });
  });
  test("redacts nested sensitive values", () => {
    const entry = logger.info("Request context", {
      request: {
        authorization: "Bearer secret-token",
        cookie: "session-secret",
        user: {
          password: "secret-password",
        },
      },
    });
    expect(entry.context).toEqual({
      request: {
        authorization: "[REDACTED]",
        cookie: "[REDACTED]",
        user: {
          password: "[REDACTED]",
        },
      },
    });
  });
  test("preserves non-sensitive operational data", () => {
    const entry = logger.operational("Deployment completed", {
      environment: "production",
      version: "1.0.0",
      durationMs: 1200,
    });
    expect(entry.context).toEqual({
      environment: "production",
      version: "1.0.0",
      durationMs: 1200,
    });
  });
});
