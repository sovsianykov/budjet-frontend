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
    Stack,
    Button,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useEffect } from "react";
import { Transaction } from "@/types/types";
import { calculateTransactionTotal } from "@/utils/calculateTransactionTotal";
import { useUsers } from "@/hooks/useUsers";
import { useTransactions } from "@/hooks/useTransactions";

type TransactionTableProps = {
    transactions: Transaction[];
};

type TransactionRowProps = {
    transaction: Transaction;
    onDelete: (id: string) => void;
};

const TransactionRow = ({ transaction, onDelete }: TransactionRowProps) => {
    const [open, setOpen] = useState(false);
    const total = calculateTransactionTotal(transaction.items);
    const { getUserName } = useUsers();
    const { deleteTransaction } = useTransactions();

    const handleDelete = async () => {
        const confirmed = confirm("Delete this transaction?");
        if (!confirmed) return;

        try {
            await deleteTransaction(transaction.id);
            onDelete(transaction.id); // уведомляем родителя
        } catch (e) {
            console.error(e);
            alert("Failed to delete transaction");
        }
    };

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
                    <strong>{total.toFixed(2)}</strong>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={4} sx={{ p: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2 }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Typography variant="subtitle1">Products</Typography>
                                <Button
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    variant="outlined"
                                    size="small"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </Stack>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="text-blue-800! font-semibold">Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {transaction.items.map((item) => {
                                        const subtotal = item.product.price * item.quantity;
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.product.productName}</TableCell>
                                                <TableCell align="right">{item.product.price.toFixed(2)}</TableCell>
                                                <TableCell align="right">{item.quantity}</TableCell>
                                                <TableCell align="right">{subtotal.toFixed(2)}</TableCell>
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
    const [localTransactions, setLocalTransactions] = useState<Transaction[]>(transactions);

    useEffect(() => {
        setLocalTransactions(transactions);
    }, [transactions]);

    const handleDelete = (id: string) => {
        setLocalTransactions((prev) => prev.filter((t) => t.id !== id));
    };

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
                    {localTransactions.map((transaction) => (
                        <TransactionRow
                            key={transaction.id}
                            transaction={transaction}
                            onDelete={handleDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};