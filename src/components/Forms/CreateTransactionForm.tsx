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
    MenuItem,
    Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useTransactions } from "@/hooks/useTransactions";
import { CreateTransactionInput } from "@/types/types";
import { Product } from "@/types/types";

interface Props {
    products: Product[]; // your mock products array
}

export const CreateTransactionForm: React.FC<Props> = ({ products }) => {
    const { createTransaction } = useTransactions();

    const { control, handleSubmit, reset } = useForm<CreateTransactionInput>({
        defaultValues: {
            items: [{ productId: "", quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = async (data: CreateTransactionInput) => {
        try {
            const newTransaction = await createTransaction(data);
            console.log("Created transaction:", newTransaction);
            reset(); // clear form after success
        } catch (err: unknown) {
            console.error(err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2, maxWidth: 600 }}>
            <Typography variant="h6" mb={2}>
                Create Transaction
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">Items</Typography>
            {fields.map((field, index) => (
                <Stack
                    key={field.id}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                >
                    {/* Product select */}
                    <Controller
                        name={`items.${index}.productId`}
                        control={control}
                        rules={{ required: "Product is required" }}
                        render={({ field }) => (
                            <TextField select label="Product" {...field} sx={{ flex: 1 }}>
                                {products.map((p, idx) => (
                                    <MenuItem key={p.id ?? idx} value={p.id}>
                                        {p.productName} (${p.price.toFixed(2)})
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}
                    />

                    {/* Quantity */}
                    <Controller
                        name={`items.${index}.quantity`}
                        control={control}
                        rules={{ required: "Quantity required", min: 1 }}
                        render={({ field }) => (
                            <TextField
                                type="number"
                                label="Qty"
                                {...field}
                                sx={{ width: 100 }}
                                inputProps={{ min: 1 }}
                            />
                        )}
                    />

                    {/* Remove item */}
                    <IconButton color="error" onClick={() => remove(index)}>
                        <Remove />
                    </IconButton>
                </Stack>
            ))}

            <Button
                startIcon={<Add />}
                variant="outlined"
                onClick={() => append({ productId: "", quantity: 1 })}
                sx={{ mb: 2 }}
            >
                Add Item
            </Button>

            <Box>
                <Button type="submit" variant="contained" color="primary">
                    Create Transaction
                </Button>
            </Box>
        </Box>
    );
};
