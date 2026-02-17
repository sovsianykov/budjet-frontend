"use client";

import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import { Transaction } from "@/types/types";
import {calculateTransactionTotal} from "@/utils/calculateTransactionTotal";
import {useUsers} from "@/hooks/useUsers";

type TransactionTableProps = {
    transactions: Transaction[];
};

type TransactionRowProps = {
    transaction: Transaction;
};

const TransactionRow = ({ transaction }: TransactionRowProps) => {
    const [open, setOpen] = useState(false);

    const total = calculateTransactionTotal(transaction.items);

    const { getUserName }= useUsers()


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

                <TableCell>{getUserName(transaction.userId)}</TableCell>

                <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                    <strong>{total.toFixed(2)} hrv</strong>
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
                                                <TableCell>{item.product.name}</TableCell>
                                                <TableCell align="right">
                                                    {item.product.price.toFixed(2)} hrv
                                                </TableCell>
                                                <TableCell align="right">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {subtotal.toFixed(2)} hrv
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


export const TransactionsTable = ({ transactions }: TransactionTableProps) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {transactions.map((transaction) => (
                        <TransactionRow
                            key={transaction.id}
                            transaction={transaction}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
