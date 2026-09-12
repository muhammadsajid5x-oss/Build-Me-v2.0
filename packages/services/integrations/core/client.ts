import { logger } from "@build-me/utils";
import { IntegrationError } from "./errors";
export type IntegrationRequest = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
};
export type IntegrationResponse<T> = {
  data: T;
  status: number;
  headers: Headers;
};
export async function requestIntegration<T>(
  request: IntegrationRequest,
): Promise<IntegrationResponse<T>> {
  const method = request.method ?? "GET";
  logger.info("Integration request started.", {
    method,
    url: request.url,
  });
  try {
    const response = await fetch(request.url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
      ...(request.body !== undefined
        ? { body: JSON.stringify(request.body) }
        : {}),
    });
    const contentType = response.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();
    if (!response.ok) {
      logger.error("Integration request returned an error.", {
        method,
        url: request.url,
        status: response.status,
      });
      throw new IntegrationError(
        `Integration request failed with status ${response.status}.`,
        "INTEGRATION_REQUEST_FAILED",
        response.status,
      );
    }
    logger.info("Integration request completed.", {
      method,
      url: request.url,
      status: response.status,
    });
    return {
      data: data as T,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    if (error instanceof IntegrationError) {
      throw error;
    }
    logger.error("Integration request failed.", {
      method,
      url: request.url,
    });
    throw new IntegrationError(
      "Integration request failed.",
      "INTEGRATION_REQUEST_FAILED",
    );
  }
}
