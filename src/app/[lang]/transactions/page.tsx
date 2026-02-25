"use client"
import {Box, CircularProgress} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import { CreateTransactionForm } from "@/components/Forms/CreateTransactionForm";
import {useTransactions} from "@/hooks/useTransactions";
import {useEffect} from "react";
import {TransactionsTable} from "@/components/TransactionsTable/TransactionsTable";

export default function CreateTransactionPage() {

   const { transactions, fetchTransactions } = useTransactions()

    useEffect(() => {
        fetchTransactions()
    },[fetchTransactions])

    if (!transactions) return <Box display="flex" justifyContent="center" sx={{ marginTop: 10 }}><CircularProgress/></Box>

    return (
        <Box display="flex" flexDirection="column" color='gray' bgcolor='white' sx={{ maxWidth: 400, marginX: "auto" }}>
            <Sidebar/>
            <div>
                <CreateTransactionForm />
            </div>
            <div>
                <TransactionsTable transactions={transactions}/>
            </div>
        </Box>
    )
}