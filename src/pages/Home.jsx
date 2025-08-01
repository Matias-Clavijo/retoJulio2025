import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Paper,
    Typography,
    Box
} from '@mui/material';
import {
    Inventory, LocalOffer, Category, Warehouse, Store,
    TrendingUp, PointOfSale
} from '@mui/icons-material';
import logo from '../assets/logo.jpeg';

const primaryColor = '#0B2240'; // Azul logo
const accentColor = '#F5C518';  // Amarillo logo

const options = [
    { label: 'Productos', icon: Inventory, path: '/products' },
    { label: 'Marcas', icon: LocalOffer, path: '/brands' },
    { label: 'Categorías', icon: Category, path: '/category' },
    { label: 'Depósitos', icon: Warehouse, path: '/warehouses' },
    { label: 'Proveedores', icon: Store, path: '/providers' },
    { label: 'Movimientos', icon: TrendingUp, path: '/movements' },
    { label: 'Ventas', icon: PointOfSale, path: '/sales' },
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', p: 4, textAlign: 'center' }}>
            <Box sx={{ mb: 3 }}>
                <img
                    src={logo}
                    alt="Logo Brava Store"
                    style={{ width: 220, height: 'auto' }}
                />
            </Box>

            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Bienvenido a Brava Store
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
                Accedé rápidamente a las secciones del sistema
            </Typography>

            <Grid container spacing={3} justifyContent="center" mt={2}>
                {options.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} lg={2} key={index}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: 3,
                                textAlign: 'center',
                                borderRadius: 3,
                                cursor: 'pointer',
                                transition: '0.3s',
                                '&:hover': {
                                    backgroundColor: primaryColor,
                                    '& .icon': {
                                        color: 'white',
                                    },
                                    '& .label': {
                                        color: 'white',
                                    },
                                },
                            }}
                            onClick={() => navigate(item.path)}
                        >
                            <item.icon className="icon" sx={{ fontSize: 40, color: primaryColor }} />
                            <Typography
                                variant="h6"
                                fontWeight="600"
                                className="label"
                                sx={{ color: primaryColor, mt: 1 }}
                            >
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
