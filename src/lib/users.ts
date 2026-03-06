import { apiRequest } from "./api";
import { User } from "@/types/auth";

// Get all users
export async function getUsers(): Promise<User[]> {
    return await apiRequest<User[]>("/users", undefined, "GET");
}

// Get single user by ID
export async function getUserById(id: string): Promise<User> {
    return await apiRequest<User>(`/users/${id}`, undefined, "GET");
}
