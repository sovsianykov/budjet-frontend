"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";

import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Alert
} from "@mui/material";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const { login,isLoading,isAuthenticated } = useAuth();
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        defaultValues: { email: "", password: "" },
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: LoginFormInputs) => {
        setErrorMsg(null); // сброс ошибки
        try {
            await login(data.email, data.password);
            // больше не нужно делать router.push здесь
        } catch (err: unknown) {
            if (err instanceof Error) setErrorMsg(err.message);
        }
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "background.default",
            }}
        >
            <Paper sx={{ p: 4, width: "100%", backgroundColor: "background.paper" }}>
                <Typography variant="h4" fontWeight={700} align="center" mb={1}>
                    Sign In
                </Typography>

                <Typography variant="body1" color="text.primary" align="center" mb={4}>
                    Welcome back to Family Budget site
                </Typography>

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Alert>
                )}

                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    display="flex"
                    flexDirection="column"
                    gap={2}
                >
                    {/* Email */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email обязателен",
                            pattern: { value: /^\S+@\S+$/i, message: "Неверный email" },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoComplete="email"
                                label="Email"
                                type="email"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />

                    {/* Password */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Password is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoComplete="current-password"
                                label="Password"
                                type="password"
                                fullWidth
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        disabled={isSubmitting || isLoading}
                    >
                        {isSubmitting || isLoading ? "Logging in..." : "Login"}
                    </Button>
                </Box>

                <Typography variant="body2" align="center" color="text.secondary" mt={3}>
                    Don&#39;t have an account?{" "}
                    <Typography
                        component="span"
                        sx={{
                            cursor: "pointer",
                            fontWeight: 500,
                            textDecoration: "underline",
                        }}
                        onClick={() => router.push("/register")}
                    >
                        sign up
                    </Typography>
                </Typography>
            </Paper>
        </Container>
    );
}