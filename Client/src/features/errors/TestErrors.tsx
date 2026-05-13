import { Alert, Button, ButtonGroup, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import agent from '../../lib/api/agent';
import { useState } from 'react';

type ErrorRequest = {
    path: string;
    method?: 'get' | 'post';
};

export default function TestErrors() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    const { mutate } = useMutation({
        mutationFn: async ({ path, method = 'get' }: ErrorRequest) => {
            return method === 'post'
                ? agent.post(path, {})
                : agent.get(path);
        },
        onError: (err: unknown) => {
            if (Array.isArray(err)) {
                setValidationErrors(err);
            } else {
                setValidationErrors([]);
            }
        },
    });

    const handleError = (path: string, method: ErrorRequest['method'] = 'get') => {
        mutate({ path, method });
    };

    return (
        <>
            <Typography variant="h4">Test errors component</Typography>

            <ButtonGroup variant="contained" sx={{ mt: 4 }}>
                <Button onClick={() => handleError('buggy/not-found')}>
                    Not found
                </Button>
                <Button onClick={() => handleError('buggy/bad-request')}>
                    Bad request
                </Button>
                <Button onClick={() => handleError('activities', 'post')}>
                    Validation error
                </Button>
                <Button onClick={() => handleError('buggy/server-error')}>
                    Server error
                </Button>
                <Button onClick={() => handleError('buggy/unauthorised')}>
                    Unauthorised
                </Button>
            </ButtonGroup>
            {validationErrors.length > 0 && (
                <Stack sx={{ mt: 3 }} spacing={1}>
                    {validationErrors.map((error, i) => (
                        <Alert key={i} severity="error">
                            {error}
                        </Alert>
                    ))}
                </Stack>
            )}
        </>
    );
}
