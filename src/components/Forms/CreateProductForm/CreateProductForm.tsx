"use client";

import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Product } from "@/types/types";
import {createProduct} from "@/lib/products";

type FormValues = {
    productName: string;
    price: number;
};

export default function CreateProductForm() {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            productName: "",
            price: 0,
        },
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
            createProduct(product);

        } catch (error) {
            console.log(error);
        }

        reset();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 20,
                px: 2,
            }}
        >
            <Typography variant="h5">Create Product</Typography>

            {/* Product Name */}
            <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Product"
                        fullWidth
                        error={!!errors.productName}
                        helperText={errors.productName?.message}
                    />
                )}
            />

            {/* Price */}
            <Controller
                name="price"
                control={control}
                rules={{
                    required: "Price is required",
                    min: { value: 0, message: "Price must be >= 0" },
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Price"
                        type="number"
                        fullWidth
                        required
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
            >
                Create Product
            </Button>
        </Box>
    );
}
