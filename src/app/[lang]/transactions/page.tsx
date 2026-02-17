"use client"
import {Box, Button, CircularProgress} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useTransactions} from "@/hooks/useTransactions";
import {TransactionsTable} from "@/components/TransactionsTable/TransactionsTable";
import ErrorPage from "@/app/error";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function TransactionsPage() {

    const {transactions, loading, error, fetchTransactions} = useTransactions();




    const router = useRouter();

    if (loading) return <CircularProgress />

    if (error) return <ErrorPage error={error} reset={function (): void {
        throw new Error("Function not implemented.");
    }} />

    if (!transactions) return <div className='w-full h-screen flex flex-col items-center justify-center bg-blue-900 text-yellow-400'>
        <h1 className='text-2xl mb-3'>We have no transactions yet...</h1>
        <Button onClick={() => router.push("/en/transactions/new")} variant="contained" color="primary">Create a transaction

        </Button>
    </div>

    return (
        <Box display="flex" color='gray'  width='100%' >
            <Sidebar/>
            <div  className='bg-blue-900 w-full min-h-screen md:ml-[240px] color-white'>
                <TransactionsTable transactions={transactions}/>
            </div>
        </Box>
    )
}