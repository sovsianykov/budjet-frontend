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
import {useAuth} from "@/hooks/useAuth";

export const CreateTransactionForm = () => {
    const { createTransaction, transactions } = useTransactions();
    const { products } = useProducts();


    const { userId } = useAuth();

    console.log(userId)

    const { control, handleSubmit, reset } = useForm<CreateTransactionInput>({
        defaultValues: {
             userId: userId || "",
            items: [{ productId: "", quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });


    const onSubmit = async (data: CreateTransactionInput) => {
        const items = data.items.filter(i => i.productId && i.quantity > 0);
        if (!items.length) {
            return alert("Please add at least one product with quantity > 0");
        }

        const payload: CreateTransactionInput = {
            userId: data.userId,
            items,
        };

        try {
            const response = await createTransaction(payload);
            console.log("Created transaction:", response);
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
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 , pt: 10}}>
            <Typography variant="h6">Create Transaction</Typography>

            <Divider sx={{ my: 2 }} />

            {fields.map((field, index) => (
                <Stack
                    key={field.id}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    {/* Product select */}
                    <ProductSelectDropdown
                        control={control}
                        name={`items.${index}.productId`}
                        products={products}
                    />

                    {/* Quantity */}
                    <Controller
                        name={`items.${index}.quantity`}
                        control={control}
                        rules={{ required: true, min: 1 }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="number"
                                label="Qty"
                                sx={{ width: 50 ,}}
                            />
                        )}
                    />

                    {/* Remove */}
                    <IconButton
                        color="error"
                        onClick={() => remove(index)}
                        sx={{ width: 30 }}
                        disabled={fields.length === 1}
                    >
                        <Remove />
                    </IconButton>
                </Stack>
            ))}

            <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={() => append({ productId: "", quantity: 1 })}
                sx={{ mb: 2 , width:"100%" ,display: "inline-flex" }}
            >
                Add item
            </Button>

            <Button type="submit" variant="contained"  sx={{ mb: 2 , width:"100%" ,display: "inline-flex" }}>
                Create Transaction
            </Button>
            <Box sx={{ flexDirection: "column" , flexGrow: 1 }}>
                {transactions && transactions.map((transaction) => (
                    transaction.items.map((item) => (
                        <div key={item.productId}>
                            {item.product.name}
                        </div>
                    ))
                ))}

            </Box>
        </Box>
    );
};
