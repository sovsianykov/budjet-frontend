"use client";

import Sidebar from "../../components/Sidebar/Sidebar";
import { Box, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import styles from './dashboard.module.scss'

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <Box display="flex" color='gray' bgcolor='white' className={styles.fullscreenDashboardBg}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4">Welcome, {user?.firstName || user?.email}</Typography>
                <Typography mt={2}>
                    Здесь будет твоя главная информация и данные с бекенда.
                </Typography>
            </Box>
        </Box>
    );
}
