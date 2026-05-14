import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import TextInput from '../../app/shared/components/textInput';
import { useAccount } from '../../lib/hooks/userAccounts';
import { loginSchema, type LoginSchema } from '../../lib/schemas/loginSchema';

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            await loginUser.mutateAsync(data);
            const returnUrl = location.state?.from?.pathname || '/activities';
            navigate(returnUrl);
        } catch {
            // The mutation state drives the visible error message.
        }
    };

    return (
        <Paper sx={{ borderRadius: 3, padding: 3, maxWidth: 420, mx: 'auto' }}>
            <Typography variant="h4" component="h2" color="primary" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextInput label="Email" name="email" control={control} />
                <TextInput label="Password" name="password" type="password" control={control} />

                {loginUser.isError && (
                    <Alert severity="error">
                        Invalid email or password
                    </Alert>
                )}

                <Button
                    color="success"
                    type="submit"
                    variant="contained"
                    disabled={!isValid || loginUser.isPending || isSubmitting}
                >
                    Login
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <Typography component={Link} to="/register" color="primary" sx={{ textDecoration: 'none' }}>
                        Sign up
                    </Typography>
                </Typography>
            </Box>
        </Paper>
    );
}
