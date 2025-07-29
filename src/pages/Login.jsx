import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Link,
    Paper,
    InputAdornment
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import logo from '../assets/logo.jpeg';

function Login() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(135deg, #071d49, #f9c525)',
            }}
        >
            <Paper elevation={6} sx={{ padding: 4, width: 320, borderRadius: 3 }}>
                <Box display="flex" justifyContent="center" mb={2}>
                    <img src={logo} alt="Brava Store Logo" style={{ height: 180 }} />
                </Box>

                <Typography variant="h5" gutterBottom align="center">
                    Log In
                </Typography>

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle sx={{ color: '#071d49' }} />
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock sx={{ color: '#071d49' }} />
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        mb: 2,
                        backgroundColor: '#071d49',
                        '&:hover': {
                            backgroundColor: '#f9c525',
                            color: '#071d49'
                        }
                    }}
                >
                    Log in
                </Button>

                <FormControlLabel control={<Checkbox />} label="Remember me" />

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don’t have an account?{' '}
                    <Link component={RouterLink} to="/signup" underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;
