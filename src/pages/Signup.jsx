import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom';
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
    Typography,
    useMediaQuery,
    Alert
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    MailOutline,
    LockOutlined
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.jpeg';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { register, isAuthenticated, loading } = useAuth();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Si ya está autenticado, redirigir
    if (isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirm = () => setShowConfirm((prev) => !prev);

    const handleCheckboxChange = (event) => {
        setAcceptedTerms(event.target.checked);
        if (event.target.checked) {
            setError('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError('El nombre es requerido');
            return false;
        }
        if (!formData.lastName.trim()) {
            setError('El apellido es requerido');
            return false;
        }
        if (!formData.email.trim()) {
            setError('El email es requerido');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('El email no es válido');
            return false;
        }
        if (!formData.password) {
            setError('La contraseña es requerida');
            return false;
        }
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        }
        if (!acceptedTerms) {
            setError('Debe aceptar los términos para poder registrarse');
            return false;
        }
        return true;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await register({
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            if (result.success) {
                setSuccess('¡Registro exitoso! Redirigiendo al login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(result.error || 'Error al crear la cuenta');
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
                    width: isMobile ? '100%' : 370,
                    maxWidth: 370,
                    borderRadius: 3
                }}
            >
                <Box display="flex" justifyContent="center" mb={1}>
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
                    Sign Up
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <form onSubmit={handleSignUp}>
                    <Box display="flex" gap={1} mb={2} flexDirection={isMobile ? 'column' : 'row'}>
                        <TextField 
                            label="First Name" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            fullWidth 
                        />
                        <TextField 
                            label="Last Name" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            fullWidth 
                        />
                    </Box>

                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutline sx={{ color: '#071d49' }} />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined sx={{ color: '#071d49' }} />
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
                        name="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined sx={{ color: '#071d49' }} />
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
                        control={
                            <Checkbox checked={acceptedTerms} onChange={handleCheckboxChange} />
                        }
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
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                            mt: 2,
                            backgroundColor: '#071d49',
                            '&:hover': {
                                backgroundColor: '#f9c525',
                                color: '#071d49'
                            }
                        }}
                    >
                        {isSubmitting ? 'Registrando...' : 'Sign up'}
                    </Button>
                </form>

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
