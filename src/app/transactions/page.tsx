"use client"
import {Box} from "@mui/material";
import {TransactionsTable} from "@/components/TransactionsTable/TransactionsTable";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function TransactionsPage() {
    return (
        <Box display="flex" color='gray' bgcolor='white'>
            <Sidebar/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <TransactionsTable/>
            </Box>
        </Box>
    )
}