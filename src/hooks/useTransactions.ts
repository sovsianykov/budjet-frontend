"use client"
import { useState, useCallback } from 'react';
import {
    getTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction, deleteAllTransactions,
} from '@/lib/transactions';
import { Transaction, CreateTransactionInput } from '@/types/types';

function parseError(err: unknown): Error {
    if (err instanceof Error) return err;
    return new Error(String(err));
}

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[] | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Fetch all transactions
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (err: unknown) {
            setError(parseError(err));
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch a single transaction by ID
    const fetchTransaction = useCallback(
        async (id: string) => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const data = await getTransactionById(id);
                setTransaction(data);
            } catch (err: unknown) {
                setError(parseError(err));
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // Create a transaction
    const createTransactionHandler = useCallback(
        async (data: CreateTransactionInput) => {
            setLoading(true);
            setError(null);
            try {
                const newTransaction = await createTransaction(data);
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
        []
    );

    // Update a transaction
    const updateTransactionHandler = useCallback(
        async (id: string, data: Partial<CreateTransactionInput>) => {
            setLoading(true);
            setError(null);
            try {
                const updated = await updateTransaction(id, data);
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
        [transaction]
    );

    // Delete a transaction
    const deleteTransactionHandler = useCallback(
        async (id: string) => {
            setLoading(true);
            setError(null);
            try {
                await deleteTransaction(id);
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
        [transaction]
    );

    const deleteAllTransactionsHandler = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await deleteAllTransactions();
            setTransactions([]);
            setTransaction(null);
        } catch (err: unknown) {
            const e = parseError(err);
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);


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
