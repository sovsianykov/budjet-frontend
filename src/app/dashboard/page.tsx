"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import styles from './dashboard.module.scss'

export default function DashboardPage() {
    const { isLoading, isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <Box display="flex" color='gray' bgcolor='white' className={styles.fullscreenDashboardBg}>
            <Sidebar darkMenuIcon/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='text-white! flex flex-col items-center'>

               <div>
                   <Typography variant="h4" className="md:mx-auto!" >{`Welcome, ${user?.firstName}`}</Typography>
               </div>
                <Typography mt={2}>
                    this is your groceries app!
                </Typography>
            </Box>
        </Box>
    );
}
