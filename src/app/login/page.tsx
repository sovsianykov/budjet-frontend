"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Container, Paper, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";

type Form = { email: string; password: string };

export default function LoginMUI() {
    const { login } = useAuth();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } =
        useForm<Form>();

    const onSubmit = async (data: Form) => {
        try {
            await login(data.email, data.password);
            router.replace("/dashboard");
        } catch (e) {
            if (e instanceof Error) setError(e.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4 }}>
                {error && <Alert severity="error">{error}</Alert>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...register("email", { required: true })}
                        error={!!errors.email}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                    />

                    <Button fullWidth type="submit" variant="contained" disabled={isSubmitting}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}