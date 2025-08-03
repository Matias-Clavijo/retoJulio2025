import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Link,
    Paper,
    InputAdornment,
    useMediaQuery,
    Alert
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.jpeg';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, loading } = useAuth();
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Si ya está autenticado, redirigir
    if (isAuthenticated()) {
        const from = location.state?.from?.pathname || '/';
        return <Navigate to={from} replace />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const result = await login(credentials);
            if (result.success) {
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch {
            setError('Error al conectar con el servidor');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ background: 'linear-gradient(135deg, #071d49, #f9c525)' }}
            >
                <Typography variant="h6" color="white">
                    Cargando...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                background: 'linear-gradient(135deg, #071d49, #f9c525)',
                px: 2
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width: isMobile ? '100%' : 320,
                    maxWidth: 320,
                    borderRadius: 3
                }}
            >
                <Box display="flex" justifyContent="center">
                    <img
                        src={logo}
                        alt="Brava Store Logo"
                        style={{
                            width: 210,
                            height: 110,
                            objectFit: 'cover',
                            objectPosition: 'center'
                        }}
                    />
                </Box>

                <Typography variant="h5" gutterBottom align="center">
                    Log In
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={credentials.email}
                        onChange={handleInputChange}
                        required
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
                        name="password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock sx={{ color: '#071d49' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
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
                        {isSubmitting ? 'Iniciando sesión...' : 'Log in'}
                    </Button>
                </form>

                <FormControlLabel control={<Checkbox />} label="Remember me" />

                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account?{' '}
                    <Link component={RouterLink} to="/signup" underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;
