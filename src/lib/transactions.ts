// lib/transactions.ts
import {apiRequest} from './api';
import {Tokens} from '@/types/auth';
import {CreateTransactionInput, Transaction} from '@/types/types';

// Get all transactions
export async function getTransactions(tokens?: Tokens): Promise<Transaction[]> {
    return await apiRequest<Transaction[]>('/transactions', undefined, tokens, 'GET');
}

// Get single transaction by ID
export async function getTransactionById(id: string, tokens?: Tokens): Promise<Transaction> {
    return await apiRequest<Transaction>(`/transactions/${id}`, undefined, tokens, 'GET');
}

// Create a new transaction
export async function createTransaction(
    data: CreateTransactionInput,
    tokens?: Tokens,
): Promise<Transaction> {
    return await apiRequest<Transaction>('/transactions', data, tokens, 'POST');
}

// Update a transaction
export async function updateTransaction(
    id: string,
    data: Partial<CreateTransactionInput>,
    tokens?: Tokens,
): Promise<Transaction> {
    return await apiRequest<Transaction>(`/transactions/${id}`, data, tokens, 'PUT');
}

// Delete a transaction
export async function deleteTransaction(id: string, tokens?: Tokens): Promise<void> {
    await apiRequest<void>(`/transactions/${id}`, undefined, tokens, 'DELETE');
    // No return value
}

// Delete all transactions
export async function deleteAllTransactions(tokens?: Tokens): Promise<void> {
    // Calls the backend endpoint that deletes all transactions
    await apiRequest<void>('/transactions', undefined, tokens, 'DELETE');
}
