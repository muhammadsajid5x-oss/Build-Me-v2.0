export interface ApiClientOptions {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}
export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
}
export class ApiClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: Record<string, string>;
  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...options.defaultHeaders,
    };
  }
  async request<T>(
    path: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${this.baseUrl}/${path.replace(/^\/+/, "")}`;
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      body: options.body === undefined
        ? undefined
        : JSON.stringify(options.body),
      signal: options.signal,
    });
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }
    return response.json() as Promise<T>;
  }
  get<T>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    });
  }
  post<T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body,
    });
  }
  put<T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body,
    });
  }
  patch<T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body,
    });
  }
  delete<T>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">,
  ) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    });
  }
}
