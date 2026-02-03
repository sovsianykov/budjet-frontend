"use client";

import React, { useEffect, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Stack,
    Chip,
    Divider,
} from "@mui/material";
import { useTransactions } from "@/hooks/useTransactions";

export const TransactionsTable = () => {
    const { transactions, loading, error, fetchTransactions } = useTransactions();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (loading) return <Typography color='white'>Loading...</Typography>;
    // if (error) return <Typography color="error">Error: {error.message}</Typography>;
    if (!transactions?.length) return <Typography color='white'>No transactions found</Typography>;

    const calculateTotal = (tx: typeof transactions[0]) =>
        tx.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const transactionsElements = useMemo(() => {
        return transactions.map((tx) => {
            const totalPrice = calculateTotal(tx);

            return (
                <Paper key={tx.id} sx={{ mb: 2, p: 2 }} className="w-[200px\\]">
                    {/* Mobile card view */}
                    <Box display={{ xs: "block", sm: "none" }}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle2">Transaction ID:</Typography>
                            <Typography variant="body2">{tx.id}</Typography>

                            <Divider />

                            <Typography variant="subtitle2">Products:</Typography>
                            {tx.items.map((item) => (
                                <Box
                                    key={item.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Typography variant="body2">{item.product.name}</Typography>
                                    <Typography variant="body2">
                                        {item.quantity} pcs • $
                                        {(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider />

                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle2">Total:</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    ${totalPrice.toFixed(2)}
                                </Typography>
                            </Box>

                            <Chip label="Paid" color="success" size="small" />
                        </Stack>
                    </Box>

                    {/* Desktop table view */}
                    <TableContainer component={Paper} sx={{ display: { xs: "none", sm: "block" } }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Products</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Paid</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tx.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{tx.id}</TableCell>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${item.product.price.toFixed(2)}</TableCell>
                                        <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Chip label="Paid" color="success" size="small" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {/* Total row */}
                                <TableRow>
                                    <TableCell colSpan={4} align="right">
                                        <Typography fontWeight="bold">Transaction Total:</Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            );
        });
    }, [calculateTotal, transactions]);

    return <Box>{transactionsElements}</Box>;
};
