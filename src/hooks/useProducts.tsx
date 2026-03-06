'use client';

import { useCallback, useEffect, useState } from 'react';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '@/lib/products';
import {Product} from "@/types/types";

interface UseProductsOptions {
    autoLoad?: boolean;
}

export function useProducts({ autoLoad = true }: UseProductsOptions = {}) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ===== LOAD =====
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProducts();
            setProducts(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ===== CREATE =====
    const addProduct = useCallback(
        async (data: Omit<Product, 'id'>) => {
            try {
                setLoading(true);
                const newProduct = await createProduct(data);
                setProducts((prev) => [...prev, newProduct]);
                return newProduct;
            } catch (e: unknown) {

                if ( e instanceof Error ) {
                    setError(e.message);
                }

                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // ===== UPDATE =====
    const editProduct = useCallback(
        async (id: string, updates: Partial<Product>) => {
            try {
                setLoading(true);
                const updated = await updateProduct(id, updates);
                setProducts((prev) =>
                    prev.map((p) => (p.id === id ? updated : p))
                );
                return updated;
            } catch (e: unknown) {
                const err = e
                if (err instanceof Error) {
                    setError(err.message);
                }
                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // ===== DELETE =====
    const removeProduct = useCallback(
        async (id: string) => {
            try {
                setLoading(true);
                await deleteProduct(id);
                setProducts((prev) => prev.filter((p) => p.id !== id));
            } catch (e: unknown) {
                const err = e
                if (err instanceof Error) {
                    setError(err.message);
                }
                throw e;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (autoLoad) loadProducts();
    }, [autoLoad, loadProducts]);

    const getProductName = (id: string) => {
        const product = products.find(p => p.id === id);
        return product?.productName
    }

    return {
        products,
        getProductName,
        loading,
        error,
        reload: loadProducts,
        addProduct,
        editProduct,
        removeProduct,
    };
}
