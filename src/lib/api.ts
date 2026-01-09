import { Tokens } from "@/types/auth";
import { config } from "@/config/config";

export async function apiRequest<T>(
    endpoint: string,
    body: object,
    tokens?: Tokens,
    method: "POST" | "GET" | "PUT" | "DELETE" = "POST"
): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    const payload = tokens
        ? { ...body, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }
        : body;

    const res = await fetch(`${config.baseApiUrl}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "API Error");
    }

    return res.json();
}
