import { getContentfulClient } from '@/contentful/client';
import type {
    TypeProductSkeleton,
    TypeProductWithoutUnresolvableLinksResponse,
} from '@/contentful/_generated';

export const getProducts = async (
    preview = false,
): Promise<TypeProductWithoutUnresolvableLinksResponse[]> => {
    const client = getContentfulClient(preview);

    const response = await client.withoutUnresolvableLinks.getEntries<TypeProductSkeleton>({
        content_type: 'product',
        order: ['-sys.createdAt'],
    });

    return response.items;
};
