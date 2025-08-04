import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, fallbackPath = '/login' }) => {
    const { loading, isAuthenticated } = useAuth();
    const location = useLocation();

    // Mostrar loading mientras se verifica autenticación
    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated()) {
        return <Navigate to={fallbackPath} state={{ from: location }} replace />;
    }

    // Si está autenticado, mostrar el contenido
    return children;
};

export default ProtectedRoute; 