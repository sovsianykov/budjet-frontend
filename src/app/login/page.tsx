"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm, Controller } from "react-hook-form";

import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
} from "@mui/material";

type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        defaultValues: { email: "", password: "" },
    });

    // const onSubmit = async (data: LoginFormInputs) => {
    //     try {
    //         await login(data.email, data.password);
    //         router.push("/dashboard");
    //     } catch (err: unknown) {
    //         if (err instanceof Error) {
    //             alert(JSON.stringify(err.name, err.stack , err.message));
    //         }
    //     }
    // };

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data.email, data.password);

            // ждём один tick event loop,
            // чтобы React применил setState внутри useAuth
            await new Promise(resolve => setTimeout(resolve, 0));

            router.replace("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(
                    JSON.stringify(
                        {
                            name: err.name,
                            message: err.message,
                            stack: err.stack,
                        },
                        null,
                        2
                    )
                );
            }
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
            <Paper sx={{ p: 4, width: "100%", backgroundColor: "background.paper" }} >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    align="center"
                    mb={1}
                >
                    Sign In
                </Typography>

                <Typography
                    variant="body1"
                    color="text.primary"
                    align="center"
                    mb={4}
                >
                    Welcome back to Family Budget site
                </Typography>

                <Typography variant="h5" mb={3} align="center">
                    Login
                </Typography>

                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
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

                    <Button type="submit" variant="contained" color="success" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    mt={3}
                >
                    Don&#39;t have an account? {" "}
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
