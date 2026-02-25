"use client"
import { useState, useCallback } from 'react';
import {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction, deleteAllTransactions,
} from '@/lib/transactions';
import { Tokens } from '@/types/auth';
import { Transaction, CreateTransactionInput } from '@/types/types';

interface UseTransactionsOptions {
    tokens?: Tokens;
}

function parseError(err: unknown): Error {
    if (err instanceof Error) return err;
    return new Error(String(err));
}

export function useTransactions(options?: UseTransactionsOptions) {
    const tokens = options?.tokens;

    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Fetch all transactions
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTransactions(tokens);
            setTransactions(data);
        } catch (err: unknown) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    }, [tokens]);

    // Fetch a single transaction by ID
    const fetchTransaction = useCallback(
        async (id: string) => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const data = await getTransactionById(id, tokens);
                setTransaction(data);
            } catch (err: unknown) {
                setError(parseError(err));
            } finally {
                setLoading(false);
            }
        },
        [tokens]
    );

    // Create a transaction
    const createTransactionHandler = useCallback(
        async (data: CreateTransactionInput) => {
            setLoading(true);
            setError(null);
            try {
                const newTransaction = await createTransaction(data, tokens);
                setTransactions(prev => (prev ? [newTransaction, ...prev] : [newTransaction]));
                return newTransaction;
            } catch (err: unknown) {
                if ( err instanceof Error ) {
                    console.log(err.message)
                }
                throw err;

            } finally {
                setLoading(false);
            }
        },
        [tokens]
    );

    // Update a transaction
    const updateTransactionHandler = useCallback(
        async (id: string, data: Partial<CreateTransactionInput>) => {
            setLoading(true);
            setError(null);
            try {
                const updated = await updateTransaction(id, data, tokens);
                setTransactions(prev =>
                    prev ? prev.map(t => (t.id === id ? updated : t)) : [updated]
                );
                if (transaction?.id === id) setTransaction(updated);
                return updated;
            } catch (err: unknown) {
                const e = parseError(err);
                setError(e);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [tokens, transaction]
    );

    // Delete a transaction
    const deleteTransactionHandler = useCallback(
        async (id: string) => {
            setLoading(true);
            setError(null);
            try {
                await deleteTransaction(id, tokens);
                setTransactions(prev => (prev ? prev.filter(t => t.id !== id) : null));
                if (transaction?.id === id) setTransaction(null);
            } catch (err: unknown) {
                const e = parseError(err);
                setError(e);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [tokens, transaction]
    );

    const deleteAllTransactionsHandler = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAllTransactions(tokens);
            setTransactions([]);
            setTransaction(null);
        } catch (err: unknown) {
            const e = parseError(err);
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    }, [tokens]);


    return {
        transactions,
        transaction,
        loading,
        error,
        fetchTransactions,
        fetchTransaction,
        deleteAll: deleteAllTransactionsHandler,
        createTransaction: createTransactionHandler,
        updateTransaction: updateTransactionHandler,
        deleteTransaction: deleteTransactionHandler,
    };
}

