import type { TypeProductWithoutUnresolvableLinksResponse } from '@/contentful/_generated';

export interface Product {
    id: string;
    name: string;
    price: number;
    createdAt: string;
}

export const mapProduct = (
    entry: TypeProductWithoutUnresolvableLinksResponse,
): Product => ({
    id: entry.sys.id,
    name: entry.fields.productName ?? '',
    price: entry.fields.price ?? 0,
    createdAt: entry.sys.createdAt,
});
