"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    Box,
    TextField,
    Button,
    Stack,
    IconButton,
    Typography,
    Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useTransactions } from "@/hooks/useTransactions";
import { useProducts } from "@/hooks/useProducts";
import { CreateTransactionInput } from "@/types/types";
import { ProductSelectDropdown } from "../ProductSelectDropdown/ProductSelectDropdown";
import { useAuth } from "@/hooks/useAuth";

export const CreateTransactionForm = () => {
    const { createTransaction } = useTransactions();
    const { products } = useProducts();
    const { userId } = useAuth();

    const { control, handleSubmit, reset, watch } =
        useForm<CreateTransactionInput>({
            defaultValues: {
                userId: userId || "",
                items: [{ productId: "", quantity: 1 }],
            },
        });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const watchedItems = watch("items");

    const onSubmit = async (data: CreateTransactionInput) => {
        const items = data.items
            .filter(i => i.productId && i.quantity > 0)
            .map(i => ({
                ...i,
                quantity: Number(i.quantity),
            }));

        if (!items.length) {
            return alert("Please add at least one product with quantity > 0");
        }

        const payload: CreateTransactionInput = {
            userId: data.userId,
            items,
        };

        try {
            await createTransaction(payload);
            reset({
                userId: data.userId,
                items: [{ productId: "", quantity: 1 }],
            });
        } catch (e) {
            console.error(e);
            alert("Failed to create transaction");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, pt: 10 }}>
            <Typography variant="h6" color="primary">
                Create Transaction
            </Typography>

            <Divider sx={{ my: 2 }} />

            {fields.map((field, index) => {
                const selectedProductIds = watchedItems
                    ?.map((item, i) => (i === index ? null : item.productId))
                    .filter(Boolean) ?? [];

                const availableProducts = products.filter(
                    (product) => !selectedProductIds.includes(product.id)
                );

                return (
                    <Stack
                        key={field.id}
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                        sx={{ mb: 2 }}
                    >
                        <ProductSelectDropdown
                            control={control}
                            name={`items.${index}.productId`}
                            products={availableProducts}
                        />

                        <Controller
                            name={`items.${index}.quantity`}
                            control={control}
                            rules={{ required: true, min: 1 }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    label="Qty"
                                    sx={{ width: 80 }}
                                />
                            )}
                        />

                        <IconButton
                            color="error"
                            onClick={() => remove(index)}
                            sx={{ width: 30 }}
                            disabled={fields.length === 1}
                        >
                            <Remove />
                        </IconButton>
                    </Stack>
                );
            })}

            <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={() => append({ productId: "", quantity: 1 })}
                sx={{ mb: 2, width: "100%" }}
            >
                Add item
            </Button>

            <Button type="submit" variant="contained" sx={{ mb: 2, width: "100%" }}>
                Create Transaction
            </Button>
        </Box>
    );
};