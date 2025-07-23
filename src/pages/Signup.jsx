import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    MailOutline,
    LockOutlined
} from '@mui/icons-material';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirm = () => setShowConfirm((prev) => !prev);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>

                <Box display="flex" gap={1} mb={2}>
                    <TextField label="First Name" fullWidth />
                    <TextField label="Last Name" fullWidth />
                </Box>

                <TextField
                    label="Email"
                    fullWidth
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    label="Confirm Password"
                    type={showConfirm ? 'text' : 'password'}
                    fullWidth
                    margin="dense"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ color: 'action.active' }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowConfirm} edge="end">
                                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Typography variant="body2">
                            I Agree with{' '}
                            <Link href="#" underline="hover">privacy</Link>{' '}
                            and{' '}
                            <Link href="#" underline="hover">policy</Link>
                        </Typography>
                    }
                    sx={{ mt: 1 }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Sign up
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login" underline="hover">
                        Log in
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default SignUp;
