"use client";

import { useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";

type ErrorPageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log to monitoring service (Sentry, etc.)
        console.error(error);
    }, [error]);

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Something went wrong 😵
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    An unexpected error occurred. Please try again.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={reset}
                >
                    Try again
                </Button>
            </Box>
        </Container>
    );
}
