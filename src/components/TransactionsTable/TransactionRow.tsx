"use client";
import {Transaction, TransactionItem} from "@/types/types";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type TransactionRowProps = {
    transaction: Transaction;
};




const calculateTransactionTotal = (items: TransactionItem[]) =>
    items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

export const TransactionRow = ({ transaction }: TransactionRowProps) => {
    const [open, setOpen] = useState(false);

    const total = calculateTransactionTotal(transaction.items);

    return (
        <>
            <TableRow
                sx={{
                    "&:nth-of-type(odd)": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>{transaction.id}</TableCell>

                <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                    <strong>${total.toFixed(2)}</strong>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={4} sx={{ p: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Products
                            </Typography>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {transaction.items.map((item) => {
                                        const subtotal =
                                            item.product.price * item.quantity;

                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.product.productName}</TableCell>
                                                <TableCell align="right">
                                                    ${item.product.price.toFixed(2)}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell align="right">
                                                    ${subtotal.toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
