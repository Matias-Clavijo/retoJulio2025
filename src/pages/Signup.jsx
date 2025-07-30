import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    useMediaQuery
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    MailOutline,
    LockOutlined
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo.jpeg';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detecta vista móvil

    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const toggleShowConfirm = () => setShowConfirm((prev) => !prev);

    const handleCheckboxChange = (event) => {
        setAcceptedTerms(event.target.checked);
        if (event.target.checked) {
            setShowError(false);
        }
    };

    const handleSignUp = () => {
        if (acceptedTerms) {
            navigate('/');
        } else {
            setShowError(true);
        }
    };

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

                <Box display="flex" gap={1} mb={2} flexDirection={isMobile ? 'column' : 'row'}>
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
                                <MailOutline sx={{ color: '#071d49' }} />
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
                    type={showConfirm ? 'text' : 'password'}
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
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        backgroundColor: '#071d49',
                        '&:hover': {
                            backgroundColor: '#f9c525',
                            color: '#071d49'
                        }
                    }}
                    onClick={handleSignUp}
                >
                    Sign up
                </Button>

                {showError && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        Debe aceptar los términos para poder ingresar
                    </Typography>
                )}

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
