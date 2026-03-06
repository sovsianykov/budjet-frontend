// lib/transactions.ts
import {apiRequest} from './api';
import {CreateTransactionInput, Transaction} from '@/types/types';

// Get all transactions
export async function getTransactions(): Promise<Transaction[]> {
    return await apiRequest<Transaction[]>('/transactions', undefined, 'GET');
}

// Get single transaction by ID
export async function getTransactionById(id: string): Promise<Transaction> {
    return await apiRequest<Transaction>(`/transactions/${id}`, undefined, 'GET');
}

// Create a new transaction
export async function createTransaction(
    data: CreateTransactionInput,
): Promise<Transaction> {
    return await apiRequest<Transaction>('/transactions', data, 'POST');
}

// Update a transaction
export async function updateTransaction(
    id: string,
    data: Partial<CreateTransactionInput>,
): Promise<Transaction> {
    return await apiRequest<Transaction>(`/transactions/${id}`, data, 'PUT');
}

// Delete a transaction
export async function deleteTransaction(id: string): Promise<void> {
    await apiRequest<void>(`/transactions/${id}`, undefined, 'DELETE');
}

// Delete all transactions
export async function deleteAllTransactions(): Promise<void> {
    await apiRequest<void>('/transactions', undefined, 'DELETE');
}
