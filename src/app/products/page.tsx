import { getProducts } from '@/contentful/api/getProducts';
import { mapProduct } from '@/contentful/mappers/productMapper';

export default async function ProductsPage() {
    const entries = await getProducts();
    const products = entries.map(mapProduct);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} — ${p.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
