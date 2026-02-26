"use client";

import { useRouter } from "next/navigation";
import { Box, Typography, Button, Container, Paper } from "@mui/material";

export default function NotFound() {
    const router = useRouter();

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    p: 6,
                    textAlign: "center",
                    borderRadius: 4,
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                }}
            >
                {/* 404 */}
                <Typography
                    variant="h1"
                    fontWeight={800}
                    sx={{
                        fontSize: { xs: "5rem", md: "7rem" },
                        lineHeight: 1,
                        mb: 2,
                    }}
                >
                    404
                </Typography>

                {/* Title */}
                <Typography variant="h4" fontWeight={600} mb={2}>
                    Page Not Found
                </Typography>

                {/* Description */}
                <Typography variant="body1" sx={{ opacity: 0.8 }} mb={4}>
                    The page you are looking for doesn’t exist or has been moved.
                </Typography>

                {/* Button */}
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => router.push("/")}
                    sx={{
                        px: 4,
                        py: 1.2,
                        borderRadius: 3,
                        fontWeight: 600,
                        background: "linear-gradient(45deg, #00c853, #64dd17)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                        "&:hover": {
                            background: "linear-gradient(45deg, #00e676, #76ff03)",
                        },
                    }}
                >
                    Go Home
                </Button>
            </Paper>
        </Container>
    );
}