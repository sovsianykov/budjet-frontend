"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { Tokens, User, RegisterPayload } from "@/types/auth";
import { config } from "@/config/config";

const STORAGE_KEY = config.storageKey;

const getInitialTokens = (): Tokens | null => {
    if (typeof window === "undefined") return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

const getInitialUserId = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(`${STORAGE_KEY}-userId`);
};

export function useAuth() {
    const [tokens, setTokens] = useState<Tokens | null>(getInitialTokens);
    const [userId, setUserId] = useState<string | null>(getInitialUserId);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // 🔐 LOGIN
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>("/auth/sign_in", { email, password });

            const tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
            localStorage.setItem(`${STORAGE_KEY}-userId`, data.user.id);

            setTokens(tokens);
            setUserId(data.user.id);
            setUser(data.user);
        } finally {
            setIsLoading(false);
        }
    };

    // 📝 REGISTER
    const register = async (payload: RegisterPayload) => {
        setIsLoading(true);
        try {
            const data = await apiRequest<{
                user: User;
                accessToken: string;
                refreshToken: string;
            }>("/auth/sign_up", payload);

            const tokens = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
            localStorage.setItem(`${STORAGE_KEY}-userId`, data.user.id);

            setTokens(tokens);
            setUserId(data.user.id);
            setUser(data.user);
        } finally {
            setIsLoading(false);
        }
    };

    // 👤 CURRENT USER (SESSION RESTORE)
    const me = async (): Promise<User | null> => {
        if (!tokens?.accessToken) return null;

        setIsLoading(true);
        try {
            const userData = await apiRequest<User>("/auth/me", {}, tokens);
            setUser(userData);
            setUserId(userData.id);
            localStorage.setItem(`${STORAGE_KEY}-userId`, userData.id);
            return userData;
        } catch {
            // токен недействителен / истёк
            setUser(null);
            setTokens(null);
            setUserId(null);
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(`${STORAGE_KEY}-userId`);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // 🚪 LOGOUT
    const logout = () => {
        setTokens(null);
        setUser(null);
        setUserId(null);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(`${STORAGE_KEY}-userId`);
    };

    // 🔄 REFRESH TOKEN
    const refresh = async () => {
        if (!tokens?.refreshToken) throw new Error("No refresh token");

        const newTokens = await apiRequest<Tokens>(
            "/auth/refresh",
            { token: tokens.refreshToken },
            tokens
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newTokens));
        setTokens(newTokens);
    };

    return {
        user,
        userId,
        tokens,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        me,
        logout,
        refresh,
    };
}
