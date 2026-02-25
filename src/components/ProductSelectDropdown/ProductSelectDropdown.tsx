import React from "react";
import {Controller, Control} from "react-hook-form";
import {TextField, MenuItem} from "@mui/material";
import {Product} from "@/types/types";
import {CreateTransactionInput} from "@/types/types";

type Props = {
    control: Control<CreateTransactionInput>;
    name: `items.${number}.productId`;
    products: Product[];
};

export const ProductSelectDropdown = ({control, name, products,}: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{required: "Product is required"}}
            render={({field, fieldState}) => (
                <TextField
                    {...field}
                    select
                    label="Enter a product name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    sx={{flex: 1, color: "#bdbdbd"}}
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.productName} — ${product.price.toFixed(2)}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
    );
};
