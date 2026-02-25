"use client";

import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import styles from './dashboard.module.scss'
import {useEffect} from "react";

export default function DashboardPage() {
    const { user , tokens, me} = useAuth();

    useEffect(() => {
        if (tokens?.accessToken) {
            me();
        }
    }, [tokens?.accessToken]);

    return (
        <Box display="flex" color='gray' bgcolor='white' className={styles.fullscreenDashboardBg}>
            <Sidebar darkMenuIcon/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='text-white!'>
                <Typography variant="h4" >Welcome, {user?.firstName || user?.email}</Typography>
                <Typography mt={2}>
                    this is your groceries app!
                </Typography>
            </Box>
        </Box>
    );
}
