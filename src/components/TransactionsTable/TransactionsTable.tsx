"use client";

import React, { useEffect, useMemo } from "react";
import Link from 'next/link'
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
    const {transactions, loading, error, fetchTransactions} = useTransactions();

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    if (loading) return <Typography color='white'>Loading...</Typography>;
    if (!transactions?.length) return <Box>
        <Typography color='white'>No transactions found</Typography>
        <Link href='/en/transactions/new' className='px-2 py-2 text-white'>
            Create Transaction
        </Link>
    </Box>;

    const calculateTotal = (tx: typeof transactions[0]) =>
        tx.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (<div>
        <Link href='/en/transactions/new' className='px-2 py-2 text-white'>
            Create Transaction
        </Link>
    </div>)

}