const API_URL = process.env.API_URL;

// One error type for every failed API call, so callers can check `status`
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!API_URL) {
    throw new Error("API_URL is not set. Add it to apps/web/.env.local");
  }

  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      message?: string | string[];
    } | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : (body?.message ?? response.statusText);
    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}
