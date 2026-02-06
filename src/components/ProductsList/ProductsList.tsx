"use client";

import { useSettingsContext } from "@/contexts/SettingsProvider";
import {ArrowBack} from "@mui/icons-material"
import {ArrowForward} from "@mui/icons-material"
import {
    Box,
    Typography,
    Stack,
    CircularProgress,
} from "@mui/material";
import SwipeableProductCard from "@/components/SwipeabelProductCard/SwipeableProductCard";
import {Product} from "@/types/types";

type ProductsListProps = {
    products: Product[];
    loading: boolean;
    error: string | null;
    onDelete: (id: string) => void;
};

export default function ProductsList({ products, loading, error, onDelete }: ProductsListProps) {
    const { getLabelsForCommonKey } = useSettingsContext();
    const { product, price } = getLabelsForCommonKey("productList", [
        "product",
        "price",
    ]);


    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <CircularProgress />
            </Box>
        );

    if (error)
        return (
            <Typography color="error" align="center" mt={4}>
                Failed to load products
            </Typography>
        );
    const handleDelete = (id: string) => {
       onDelete(id);
    };

    const handleAddToCart = (id: string) => {
        console.log("Add to cart", id)
    };
    return (
        <Box
            sx={{
                px: 2,
                py: 3,
                maxWidth: 720,
                mx: "auto",
            }}
        >
            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2, px: 1 }}
            >
                <Typography variant="subtitle1"  color="primary">
                   <ArrowBack className='text-blue-500 gap-3 items-center flex font-semibold' /> archive
                </Typography>
                <Typography variant="subtitle1" className='text-red-500 flex items-center gap-2'>
                    remove
                    <ArrowForward className='text-red-500' />
                </Typography>
            </Stack>

            {/* Product cards */}
            <Stack spacing={2} flexDirection="column-reverse">
                {products.map((item) => (
                    <SwipeableProductCard
                        key={item.id}
                        product={item}
                        onDelete={handleDelete}
                        onAddToCart={handleAddToCart}
                    />
                ))}
                  </Stack>
        </Box>
    );
};

