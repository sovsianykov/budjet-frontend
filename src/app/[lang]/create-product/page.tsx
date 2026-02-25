"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import CreateProductForm from "@/components/Forms/CreateProductForm/CreateProductForm";
import ProductsList from "@/components/ProductsList/ProductsList";
import { useProducts } from "@/hooks/useProducts";
import  Image  from 'next/image'
import productsImage from "../../../../public/assets/images/grocery-bag-in-aisle.jpg";

export default function CreateProductPage() {
    const { products, loading, error, addProduct, removeProduct } = useProducts();

    return (
        <Box display="flex" color="gray" bgcolor="white" justifyContent="center" sx={{ maxWidth: 400, marginX: "auto" }}>
            <Sidebar darkMenuIcon />
            <Box className="w-full">
                <div className='w-full relative my-2'>
                    <Image src={productsImage as unknown as string} alt={"products"} className="object-contain" />
                </div>
                <CreateProductForm onAddProduct={addProduct} />
                <ProductsList products={products} loading={loading} error={error} onDeleteAction={removeProduct} />
            </Box>
        </Box>
    );
}
