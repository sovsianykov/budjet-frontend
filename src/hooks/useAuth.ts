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
    const [isLoading] = useState(false);

    // 🔐 LOGIN
    const login = async (email: string, password: string) => {
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
    };

    // 📝 REGISTER
    const register = async (payload: RegisterPayload) => {
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

        return {
            user,
            tokens,
            login,
            register,
            logout,
            refresh,
            isAuthenticated: !!user,
        };
    };

    // 🗑 DELETE ACCOUNT
    const deleteAccount = async () => {
        if (!tokens) throw new Error("Not authenticated");

        await apiRequest("/auth/delete", {}, tokens);

        logout();
    };

    // 🔄 REFRESH
    const refresh = async () => {
        if (!tokens) throw new Error("No refresh token");

        const newTokens = await apiRequest<Tokens>("/auth/refresh", {}, tokens);

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
        deleteAccount,
        refresh,
        logout,
    };
}
