import { Tokens } from "@/types/auth";
import { config } from "@/config/config";

export async function apiRequest<T>(
    endpoint: string,
    body?: Partial<object>,
    tokens?: Tokens,
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" = "POST"
): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    const fetchOptions: RequestInit = {
        method,
        headers,
    };

    if (method !== "GET") {
        fetchOptions.body = JSON.stringify(
            tokens
                ? { ...body, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
                : body
        );
    } else if (tokens) {
        headers["Authorization"] = `Bearer ${tokens.accessToken}`;
    }

    // const res = await fetch(`${config.baseApiUrl}${endpoint}`, fetchOptions);
    const res = await fetch(`https://budjet-backend.onrender.com/api/v1${endpoint}`, fetchOptions);

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "API Error");
    }

    return res.json();
}