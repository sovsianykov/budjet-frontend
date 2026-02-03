"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { Tokens, User, RegisterPayload } from "@/types/auth";
import { config } from "@/config/config";

const getInitialTokens = (): Tokens | null => {
    if (typeof window === "undefined") return null;

    try {
        const stored = localStorage.getItem(config.storageKey);
        return stored ? JSON.parse(stored) : null;
    } catch {
        localStorage.removeItem(config.storageKey);
        return null;
    }
};

export function useAuth() {
    const [tokens, setTokens] = useState<Tokens | null>(getInitialTokens);
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

            localStorage.setItem(config.storageKey, JSON.stringify(tokens));
            setTokens(tokens);
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

            localStorage.setItem(config.storageKey, JSON.stringify(tokens));
            setTokens(tokens);
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
            console.log('userData',userData);

            return userData;
        } catch {
            // token invalid / expired
            setUser(null);
            setTokens(null);
            localStorage.removeItem(config.storageKey);
            return null;
        } finally {
            setIsLoading(false);
        }

        console.log()
    };

    // 🗑 DELETE ACCOUNT
    const deleteAccount = async () => {
        if (!tokens) throw new Error("Not authenticated");
        await apiRequest("/auth/delete", {}, tokens);
        logout();
    };

    // 🔄 REFRESH TOKEN
    const refresh = async () => {
        if (!tokens?.refreshToken) throw new Error("No refresh token");

        const newTokens = await apiRequest<Tokens>(
            "/auth/refresh",
            { token: tokens.refreshToken },
            tokens
        );

        localStorage.setItem(config.storageKey, JSON.stringify(newTokens));
        setTokens(newTokens);
    };

    // 🚪 LOGOUT
    const logout = () => {
        setTokens(null);
        setUser(null);
        localStorage.removeItem(config.storageKey);
    };

    return {
        user,
        tokens,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        me,
        deleteAccount,
        refresh,
        logout,
    };
}
