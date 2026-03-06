"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
} from "react";
import { apiRequest, ApiError } from "@/lib/api";
import { User, RegisterPayload } from "@/types/auth";
import { config } from "@/config/config";

const STORAGE_KEY = config.storageKey;

/* ---------------------------------- */
/* localStorage helpers (userId only) */
/* ---------------------------------- */
const readUserId = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(`${STORAGE_KEY}-userId`);
};

const saveUserId = (userId: string) => {
    localStorage.setItem(`${STORAGE_KEY}-userId`, userId);
};

const clearUserId = () => {
    localStorage.removeItem(`${STORAGE_KEY}-userId`);
};

/* ---------------------------------- */
/* helper: extract User from response */
/* ---------------------------------- */
function extractUser(data: unknown): User | null {
    if (!data || typeof data !== "object") return null;
    const obj = data as Record<string, unknown>;
    // { user: { id, ... } }
    if (obj.user && typeof obj.user === "object" && (obj.user as Record<string, unknown>).id) {
        return obj.user as User;
    }
    // { id, email, ... } — User directly
    if (obj.id && obj.email) {
        return obj as unknown as User;
    }
    return null;
}

/* ---------------------------------- */
/* context types                      */
/* ---------------------------------- */
interface AuthContextValue {
    user: User | null;
    userId: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
    fetchMe: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ---------------------------------- */
/* provider                           */
/* ---------------------------------- */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(readUserId());
    const [isLoading, setIsLoading] = useState(true);

    /* ---- fetch current user (me) ---- */
    const fetchMe = useCallback(async (): Promise<User | null> => {
        try {
            const data = await apiRequest<unknown>(
                "/auth/me",
                undefined,
                "GET",
            );

            const parsed = extractUser(data);
            if (parsed) {
                setUser(parsed);
                setUserId(parsed.id);
                saveUserId(parsed.id);
                return parsed;
            }

            console.error("ME: unexpected response shape", data);
            setUser(null);
            setUserId(null);
            clearUserId();
            return null;
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                setUser(null);
                setUserId(null);
                clearUserId();
                return null;
            }

            console.error("ME ERROR", err);
            setUser(null);
            setUserId(null);
            clearUserId();
            return null;
        }
    }, []);

    /* ---- session restore on app start ---- */
    useEffect(() => {
        fetchMe().finally(() => setIsLoading(false));
    }, [fetchMe]);

    /* ---- login ---- */
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<unknown>(
                "/auth/sign_in",
                { email, password },
            );

            const parsed = extractUser(data);
            if (parsed) {
                setUser(parsed);
                setUserId(parsed.id);
                saveUserId(parsed.id);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    /* ---- register ---- */
    const register = useCallback(async (payload: RegisterPayload) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<unknown>(
                "/auth/sign_up",
                payload,
            );

            const parsed = extractUser(data);
            if (parsed) {
                setUser(parsed);
                setUserId(parsed.id);
                saveUserId(parsed.id);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    /* ---- logout ---- */
    const logout = useCallback(async () => {
        try {
            await apiRequest("/auth/logout");
        } finally {
            setUser(null);
            setUserId(null);
            clearUserId();
        }
    }, []);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                userId,
                isAuthenticated,
                isLoading,
                login,
                register,
                logout,
                fetchMe,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* ---------------------------------- */
/* hook                               */
/* ---------------------------------- */
export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within <AuthProvider>");
    }
    return ctx;
}
