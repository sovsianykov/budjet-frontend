"use client";

import { useEffect, useState, useCallback } from "react";
import { getUsers } from "@/lib/users";
import { User } from "@/types/auth";
import { Tokens } from "@/types/auth";

interface UseUsersResult {
    users: User[] | null;
    loading: boolean;
    error: Error | null;
    getUserName: (id: string) => string | undefined;
    refetch: () => Promise<void>;
}

export function useUsers(tokens?: Tokens): UseUsersResult {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUsers(tokens);
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch users"));
        } finally {
            setLoading(false);
        }
    }, [tokens]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const getUserName = useCallback(
        (id: string) => users?.find(user => user.id === id)?.firstName,
        [users]
    );

    return {
        users,
        loading,
        error,
        getUserName,
        refetch: fetchUsers,
    };
}
