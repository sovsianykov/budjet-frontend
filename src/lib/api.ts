import { config } from "@/config/config";

export class ApiError extends Error {
    status?: number;
    data?: any;

    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export async function apiRequest<T>(
    endpoint: string,
    body?: Partial<object>,
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" = "POST",
    extraOptions: RequestInit = {}
): Promise<T> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    const fetchOptions: RequestInit = {
        method,
        headers,
        credentials: "include",
        ...extraOptions,
    };

    if (method !== "GET" && body) {
        fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(`${config.baseApiUrl}${endpoint}`, fetchOptions);

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new ApiError(errData.message || "API Error", res.status, errData);
    }

    return res.json();
}