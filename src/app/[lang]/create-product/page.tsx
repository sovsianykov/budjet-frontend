"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import CreateProductForm from "@/components/Forms/CreateProductForm/CreateProductForm";
import ProductsList from "@/components/ProductsList/ProductsList";
import { useProducts } from "@/hooks/useProducts";

export default function CreateProductPage() {
    const { products, loading, error, addProduct, removeProduct } = useProducts();

    return (
        <Box display="flex" color="gray" bgcolor="white" justifyContent="center" sx={{ maxWidth: 400, marginX: "auto" }}>
            <Sidebar />
            <Box className="w-full">
                <CreateProductForm onAddProduct={addProduct} />
                <ProductsList products={products} loading={loading} error={error} onDelete={removeProduct} />
            </Box>
        </Box>
    );
}
