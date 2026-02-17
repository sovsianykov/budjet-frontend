"use client"
import {Box} from "@mui/material";
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

    console.log("transactions = ",transactions)


    if (!transactions) return <div>No content</div>

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