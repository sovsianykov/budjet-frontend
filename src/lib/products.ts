"use client";
import { Product } from '@/types/types';
import { apiRequest } from '@/lib/api';
import { getErrorMessage } from '@/utils/utils';

const PRODUCTS_ENDPOINT = '/products';

async function safeRequest<T>(promise: Promise<T>): Promise<T> {
    try {
        return await promise;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}

// GET /products
export const getProducts = () =>
    safeRequest(
        apiRequest<Product[]>(
            PRODUCTS_ENDPOINT,
            undefined,
            'GET'
        )
    );

// GET /products/:id
export const getProductById = (id: string) =>
    safeRequest(
        apiRequest<Product>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            undefined,
            'GET'
        )
    );

// POST /products
export const createProduct = (
    data: Omit<Product, 'id'>,
) =>
    safeRequest(
        apiRequest<Product>(
            PRODUCTS_ENDPOINT,
            data,
            'POST'
        )
    );

// PUT /products/:id
export const updateProduct = (
    id: string,
    data: Partial<Product>,
) =>
    safeRequest(
        apiRequest<Product>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            data,
            'PUT'
        )
    );

// DELETE /products/:id
export const deleteProduct = (id: string) =>
    safeRequest(
        apiRequest<void>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            undefined,
            'DELETE'
        )
    );
