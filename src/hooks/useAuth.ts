"use client";

import { useState, useEffect, useCallback } from "react";
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
/* hook */
/* ---------------------------------- */
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(readUserId());
    const [isLoading, setIsLoading] = useState(true);

    /* ---------------------------------- */
    /* fetch current user (me) */
    /* ---------------------------------- */
    const fetchMe = useCallback(async (): Promise<User | null> => {
        try {
            const data = await apiRequest<{ user: User }>(
                "/auth/me",
                undefined,
                "GET",
            );

            setUser(data.user);
            setUserId(data.user.id);
            saveUserId(data.user.id);

            return data.user;
        } catch (err) {
            if (err instanceof ApiError && err.status === 401) {
                // пользователь не залогинен — это нормально
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

    /* ---------------------------------- */
    /* session restore on app start */
    /* ---------------------------------- */
    useEffect(() => {
        fetchMe().finally(() => setIsLoading(false));
    }, [fetchMe]);

    /* ---------------------------------- */
    /* login */
    /* ---------------------------------- */
    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ user: User }>(
                "/auth/sign_in",
                { email, password },
            );

            setUser(data.user);
            setUserId(data.user.id);
            saveUserId(data.user.id);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /* ---------------------------------- */
    /* register */
    /* ---------------------------------- */
    const register = useCallback(async (payload: RegisterPayload) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{ user: User }>(
                "/auth/sign_up",
                payload,
            );

            setUser(data.user);
            setUserId(data.user.id);
            saveUserId(data.user.id);
        } finally {
            setIsLoading(false);
        }
    }, []);

    /* ---------------------------------- */
    /* logout */
    /* ---------------------------------- */
    const logout = useCallback(async () => {
        try {
            await apiRequest(
                "/auth/logout",
            );
        } finally {
            setUser(null);
            setUserId(null);
            clearUserId();
        }
    }, []);

    /* ---------------------------------- */
    /* derived state */
    /* ---------------------------------- */
    const isAuthenticated = !!user;

    return {
        user,
        userId,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        fetchMe,
    };
}