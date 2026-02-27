"use client";

import { Box, Avatar, Typography, Card, CardContent, Divider } from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function ProfilePage() {
    const { me, tokens, user } = useAuth();

    useEffect(() => {
        if (tokens?.accessToken) {
            me();
        }
    }, [tokens?.accessToken]);

    if (!user) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6">Loading profile...</Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} bgcolor="#f5f5f5" minHeight="100vh">
            <Sidebar />

            {/* Main Content */}
            <Box flex={1} p={{ xs: 2, sm: 4 }}>
                <Typography variant="h4" color="primary" gutterBottom mt={4} className='justify-self-center'>
                    Profile
                </Typography>

                <Card sx={{ maxWidth: 500, mx: "auto", mt: 2, borderRadius: 3, boxShadow: 3 }}>
                    <CardContent>
                        {/* Avatar + Name */}
                        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                            <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
                                {user.firstName?.[0] ?? ""}{user.lastName?.[0] ?? ""}
                            </Avatar>
                            <Typography variant="h6" align="center">
                                {user.firstName ?? "-"} {user.lastName ?? "-"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                                {user.role}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* User Info */}
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                            </Box>

                            {user.phone && (
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                                    <Typography variant="body1">{user.phone}</Typography>
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}