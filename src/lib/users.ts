import { apiRequest } from "./api";
import { Tokens } from "@/types/auth";
import { User } from "@/types/auth";

// Get all users
export async function getUsers(tokens?: Tokens): Promise<User[]> {
    return await apiRequest<User[]>("/users", undefined, tokens, "GET");
}

// Get single user by ID
export async function getUserById(id: string, tokens?: Tokens): Promise<User> {
    return await apiRequest<User>(`/users/${id}`, undefined, tokens, "GET");
}

