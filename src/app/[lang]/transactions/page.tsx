"use client"
import {Box} from "@mui/material";
import {TransactionsTable} from "@/components/TransactionsTable/TransactionsTable";
import Sidebar from "@/components/Sidebar/Sidebar";


export default function TransactionsPage() {

    return (
        <Box display="flex" color='gray'  width='100%' >
            <Sidebar/>
            <div  className='bg-blue-900 w-full min-h-screen md:ml-[240px] color-white'>
                <TransactionsTable/>
            </div>
        </Box>
    )
}