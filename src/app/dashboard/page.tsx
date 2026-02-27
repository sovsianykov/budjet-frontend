"use client";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import styles from './dashboard.module.scss'
import {router} from "next/client";

export default function DashboardPage() {
    const { user ,  isLoading, isAuthenticated} = useAuth();

    if (isLoading) return
    if (!isAuthenticated) router.replace('/login')



    return (
        <Box display="flex" color='gray' bgcolor='white' className={styles.fullscreenDashboardBg}>
            <Sidebar darkMenuIcon/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='text-white! flex flex-col items-center'>

               <div>
                   <Typography variant="h4" className="md:mx-auto!" >Welcome, {user?.firstName || user?.email}</Typography>
               </div>
                <Typography mt={2}>
                    this is your groceries app!
                </Typography>
            </Box>
        </Box>
    );
}
