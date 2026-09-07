export type LogLevel =
  | "DEBUG"
  | "INFO"
  | "WARN"
  | "ERROR"
  | "SECURITY"
  | "OPERATIONAL";
export type LogContext = Record<string, unknown>;
const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "accesstoken",
  "refreshtoken",
  "authorization",
  "apikey",
  "secret",
  "cookie",
  "set-cookie",
]);
function sanitize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) {
      if (SENSITIVE_KEYS.has(key.toLowerCase())) {
        result[key] = "[REDACTED]";
      } else {
        result[key] = sanitize(entry);
      }
    }
    return result;
  }
  return value;
}
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
}
export class Logger {
  log(level: LogLevel, message: string, context?: LogContext): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(context ? { context: sanitize(context) as LogContext } : {}),
    };
    return entry;
  }
  debug(message: string, context?: LogContext): LogEntry {
    return this.log("DEBUG", message, context);
  }
  info(message: string, context?: LogContext): LogEntry {
    return this.log("INFO", message, context);
  }
  warn(message: string, context?: LogContext): LogEntry {
    return this.log("WARN", message, context);
  }
  error(message: string, context?: LogContext): LogEntry {
    return this.log("ERROR", message, context);
  }
  security(message: string, context?: LogContext): LogEntry {
    return this.log("SECURITY", message, context);
  }
  operational(message: string, context?: LogContext): LogEntry {
    return this.log("OPERATIONAL", message, context);
  }
}
export const logger = new Logger();
