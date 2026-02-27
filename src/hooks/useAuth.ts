"use client";

import { useState, useEffect, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import { Tokens, User, RegisterPayload } from "@/types/auth";
import { config } from "@/config/config";

const STORAGE_KEY = config.storageKey;

/* ---------------------------------- */
/* helpers */
/* ---------------------------------- */

const readTokens = (): Tokens | null => {
    if (typeof window === "undefined") return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

const readUserId = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(`${STORAGE_KEY}-userId`);
};

const saveSession = (tokens: Tokens, userId: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    localStorage.setItem(`${STORAGE_KEY}-userId`, userId);
};

const clearSession = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}-userId`);
};

/* ---------------------------------- */
/* hook */
/* ---------------------------------- */

export function useAuth() {
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    // важно: при старте всегда loading
    const [isLoading, setIsLoading] = useState(true);

    /* ---------------------------------- */
    /* logout */
    /* ---------------------------------- */

    const logout = useCallback(() => {
        clearSession();
        setTokens(null);
        setUser(null);
        setUserId(null);
    }, []);

    /* ---------------------------------- */
    /* fetch current user */
    /* ---------------------------------- */

    const fetchMe = useCallback(
        async (activeTokens: Tokens): Promise<User | null> => {
            try {
                const userData = await apiRequest<User>(
                    "/auth/me",
                    undefined,
                    activeTokens,
                    "GET"
                );

                setUser(userData);
                setUserId(userData.id);
                localStorage.setItem(`${STORAGE_KEY}-userId`, userData.id);

                return userData;
            } catch (err) {
                console.error("ME ERROR", err);
                return null;
            }
        },
        []
    );

    /* ---------------------------------- */
    /* session restore on app start */
    /* ---------------------------------- */

    useEffect(() => {
        const init = async () => {
            const storedTokens = readTokens();
            const storedUserId = readUserId();

            if (!storedTokens) {
                setIsLoading(false);
                return;
            }

            setTokens(storedTokens);
            if (storedUserId) setUserId(storedUserId);

            const user = await fetchMe(storedTokens);

            // если токен битый — очищаем сессию
            if (!user) {
                logout();
            }

            setIsLoading(false);
        };

        init();
    }, [fetchMe, logout]);

    /* ---------------------------------- */
    /* login */
    /* ---------------------------------- */

    const login = async (email: string, password: string) => {
        setIsLoading(true);

        try {
            const data = await apiRequest<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>("/auth/sign_in", { email, password });

            const newTokens: Tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };

            saveSession(newTokens, data.user.id);

            setTokens(newTokens);
            setUser(data.user);
            setUserId(data.user.id);
        } finally {
            setIsLoading(false);
        }
    };

    /* ---------------------------------- */
    /* register */
    /* ---------------------------------- */

    const register = async (payload: RegisterPayload) => {
        setIsLoading(true);

        try {
            const data = await apiRequest<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>("/auth/sign_up", payload);

            const newTokens: Tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };

            saveSession(newTokens, data.user.id);

            setTokens(newTokens);
            setUser(data.user);
            setUserId(data.user.id);
        } finally {
            setIsLoading(false);
        }
    };

    /* ---------------------------------- */
    /* refresh token */
    /* ---------------------------------- */

    const refresh = async () => {
        if (!tokens?.refreshToken) throw new Error("No refresh token");

        const newTokens = await apiRequest<Tokens>(
            "/auth/refresh",
            { token: tokens.refreshToken },
            tokens
        );

        saveSession(newTokens, userId!);
        setTokens(newTokens);

        return newTokens;
    };

    /* ---------------------------------- */
    /* derived state */
    /* ---------------------------------- */

    const isAuthenticated = !!tokens?.accessToken;

    /* ---------------------------------- */

    return {
        user,
        userId,
        tokens,
        isAuthenticated,
        isLoading,

        login,
        register,
        logout,
        refresh,
        me: () => (tokens ? fetchMe(tokens) : Promise.resolve(null)),
    };
}