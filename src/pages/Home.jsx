import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import {
    Inventory, LocalOffer, Category, Warehouse, Store,
    TrendingUp, PointOfSale
} from '@mui/icons-material';

const options = [
    { label: 'Productos', icon: <Inventory fontSize="large" />, path: '/products' },
    { label: 'Marcas', icon: <LocalOffer fontSize="large" />, path: '/brands' },
    { label: 'Categorías', icon: <Category fontSize="large" />, path: '/category' },
    { label: 'Depósitos', icon: <Warehouse fontSize="large" />, path: '/warehouses' },
    { label: 'Proveedores', icon: <Store fontSize="large" />, path: '/suppliers' },
    { label: 'Movimientos', icon: <TrendingUp fontSize="large" />, path: '/movements' },
    { label: 'Ventas', icon: <PointOfSale fontSize="large" />, path: '/sales' },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Bienvenido
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Accedé rápidamente a las secciones del sistema:
            </Typography>

            <Grid container spacing={3} mt={2}>
                {options.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                                    backgroundColor: 'primary.light',
                                    color: 'white'
                                }
                            }}
                            onClick={() => navigate(item.path)}
                        >
                            <IconButton color="primary">
                                {item.icon}
                            </IconButton>
                            <Typography variant="h6" fontWeight="600">
                                {item.label}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
