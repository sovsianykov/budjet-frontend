"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";

type RegisterForm = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
};

export default function RegisterPage() {
    const { register: registerUser } = useAuth();
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { isSubmitting },
    } = useForm<RegisterForm>({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
        },
    });


    const onSubmit = async (data: RegisterForm) => {
        await registerUser(data);
        router.push("/dashboard");
    };

    return (
        <Container maxWidth="xs">
            <Paper sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" mb={3} align="center">
                    Register
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Email" fullWidth required />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Password" type="password" fullWidth required />
                        )}
                    />

                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="First name" fullWidth required />
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Last name" fullWidth required />
                        )}
                    />

                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} label="Phone" fullWidth required />
                        )}
                    />

                    <Button type="submit"  color='success' variant="contained" fullWidth disabled={isSubmitting}>
                        Register
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
