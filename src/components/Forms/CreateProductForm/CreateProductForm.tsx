"use client";

import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Product } from "@/types/types";

type FormValues = {
    productName: string;
    price: number;
};

interface CreateProductFormProps {
    onAddProduct: (product: Omit<Product, "id">) => Promise<Product>;
};

export default function CreateProductForm({ onAddProduct }: CreateProductFormProps) {
    const { handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: { productName: "", price: 0 },
    });


    const onSubmit = async (data: FormValues) => {
        const now = new Date();
        const product: Omit<Product, "id"> = {
            productName: data.productName,
            price: Number(data.price),
            createdAt: now,
            updatedAt: now,
        };

        try {
            await onAddProduct(product);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 3, px: 2 }}
        >
            <Typography variant="h5" className="text-[#1976D2]">Create Product</Typography>

            <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                    <TextField {...field} label="Enter a product name" fullWidth error={!!errors.productName} helperText={errors.productName?.message} />
                )}
            />

            <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required", min: { value: 0, message: "Price must be >= 0" } }}
                render={({ field }) => (
                    <TextField {...field} label="Price" type="number" fullWidth required error={!!errors.price} helperText={errors.price?.message} />
                )}
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
                Create Product
            </Button>
        </Box>
    );
}
