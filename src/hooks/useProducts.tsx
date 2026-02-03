'use client';

import { useCallback, useEffect, useState } from 'react';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/products';
import type { Tokens } from '@/types/auth';
import {Product} from "@/types/types";

interface UseProductsOptions {
    tokens?: Tokens;
    autoLoad?: boolean; // загружать ли сразу
}

export function useProducts({ tokens, autoLoad = true }: UseProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ===== LOAD =====
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProducts(tokens);
            setProducts(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [tokens]);

    // ===== CREATE =====
    const addProduct = useCallback(
        async (data: Omit<Product, 'id'>) => {
            try {
                setLoading(true);
                const newProduct = await createProduct(data, tokens);
                setProducts((prev) => [...prev, newProduct]);
                return newProduct;
            } catch (e: any) {
                setError(e.message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [tokens]
    );

    // ===== UPDATE =====
    const editProduct = useCallback(
        async (id: string, updates: Partial<Product>) => {
            try {
                setLoading(true);
                const updated = await updateProduct(id, updates, tokens);
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? updated : p))
                );
                return updated;
            } catch (e: any) {
                setError(e.message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [tokens]
    );

    // ===== DELETE =====
    const removeProduct = useCallback(
        async (id: string) => {
            try {
                setLoading(true);
                await deleteProduct(id, tokens);
                setProducts((prev) => prev.filter((p) => p.id !== id));
            } catch (e: any) {
                setError(e.message);
                throw e;
            } finally {
                setLoading(false);
            }
        },
        [tokens]
    );

    useEffect(() => {
        if (autoLoad) loadProducts();
    }, [autoLoad, loadProducts]);

    return {
        products,
        loading,
        error,
        reload: loadProducts,
        addProduct,
        editProduct,
        removeProduct,
    };
}
