import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import TextInput from '../../app/shared/components/textInput';
import { useAccount } from '../../lib/hooks/userAccounts';
import { registerSchema, type RegisterSchema } from '../../lib/schemas/registerSchema';

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
        defaultValues: {
            displayName: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await registerUser.mutateAsync(data);
        } catch (error) {
            if (Array.isArray(error)) {
                error.forEach((message) => {
                    if (typeof message !== 'string') return;

                    if (message.includes('Email')) {
                        setError('email', { message });
                    } else if (message.includes('Password')) {
                        setError('password', { message });
                    } else if (message.includes('DisplayName') || message.includes('Display name')) {
                        setError('displayName', { message });
                    }
                });
            }
        }
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3, maxWidth: 420, mx: 'auto' }}>
            <Typography variant="h4" component="h2" color="primary" gutterBottom>
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextInput label="Display name" name="displayName" control={control} />
                <TextInput label="Email" name="email" control={control} />
                <TextInput label="Password" name="password" type="password" control={control} />

                {registerUser.isError && (
                    <Alert severity="error">
                        Registration failed. Check your details and try again.
                    </Alert>
                )}

                <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={!isValid || registerUser.isPending || isSubmitting}
                >
                    Register
                </Button>

                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Typography component={Link} to="/login" color="primary" sx={{ textDecoration: 'none' }}>
                        Login
                    </Typography>
                </Typography>
            </Box>
        </Paper>
    );
}
