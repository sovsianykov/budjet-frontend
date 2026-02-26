"use client";
import type { Tokens } from '@/types/auth';
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
export const getProducts = (tokens?: Tokens) =>
    safeRequest(
        apiRequest<Product[]>(
            PRODUCTS_ENDPOINT,
            undefined,
            tokens,
            'GET'
        )
    );

// GET /products/:id
export const getProductById = (id: string, tokens?: Tokens) =>
    safeRequest(
        apiRequest<Product>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            undefined,
            tokens,
            'GET'
        )
    );

// POST /products
export const createProduct = (
    data: Omit<Product, 'id'>,
    tokens?: Tokens
) =>
    safeRequest(
        apiRequest<Product>(
            PRODUCTS_ENDPOINT,
            data,
            tokens,
            'POST'
        )
    );

// PUT /products/:id
export const updateProduct = (
    id: string,
    data: Partial<Product>,
    tokens?: Tokens
) =>
    safeRequest(
        apiRequest<Product>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            data,
            tokens,
            'PUT'
        )
    );

// DELETE /products/:id
export const deleteProduct = (id: string, tokens?: Tokens) =>
    safeRequest(
        apiRequest<void>(
            `${PRODUCTS_ENDPOINT}/${id}`,
            undefined,
            tokens,
            'DELETE'
        )
    );
