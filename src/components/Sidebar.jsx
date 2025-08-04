import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Divider,
    Avatar,
    Paper,
    IconButton,
    useMediaQuery
} from '@mui/material';
import {
    Inventory,
    Inventory2,
    Category,
    LocalOffer,
    Warehouse,
    Store,
    TrendingUp,
    PointOfSale,
    AccountCircle,
    Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoUsuario from './Infousuario';
import logo from '../assets/logo.jpeg';

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openInfoUsuario, setOpenInfoUsuario] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');

    const drawerWidth = isMobile ? 300 : 340;

    const inventoryItems = [
        { text: 'Productos', icon: <Inventory />, path: '/products' },
        { text: 'Marcas', icon: <LocalOffer />, path: '/brands' },
        { text: 'Categorías', icon: <Category />, path: '/category' },
        { text: 'Depósitos', icon: <Warehouse />, path: '/warehouses' },
        { text: 'Proveedores', icon: <Store />, path: '/providers' }
    ];

    const operationsItems = [
        { text: 'Control de Stock', icon: <Inventory2 />, path: '/stock' },
        { text: 'Movimientos', icon: <TrendingUp />, path: '/movements' },
        { text: 'Ventas', icon: <PointOfSale />, path: '/sales' }
    ];

    const handleItemClick = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    const renderMenuSection = (title, items) => (
        <Box sx={{ mb: 2 }}>
            <Typography
                variant="caption"
                sx={{
                    px: 2,
                    py: 1,
                    color: 'text.secondary',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}
            >
                {title}
            </Typography>
            <List sx={{ py: 0, mt: "0.5rem"}}>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleItemClick(item.path)}
                            sx={{
                                px: 1,
                                mx: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#0B2240',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#08172e',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: "2.5rem",
                                    color: location.pathname === item.path ? 'primary.contrastText' : 'text.secondary'
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                width: drawerWidth,
                height: '100vh',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: isMobile ? 'auto' : 'hidden'
            }}
        >
            <Divider variant="middle" />

            {/* Logo */}
            <Box
                sx={{
                    p: isMobile ? 1 : 2,
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
                onClick={() => navigate('/')}
            >
                <img
                    src={logo}
                    alt="Brava Store Logo"
                    style={{
                        width: isMobile ? 170 : 210,
                        height: isMobile ? 90 : 110,
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
            </Box>

            <Divider variant="middle" />

            {/* Menu principal */}
            <Box sx={{ flex: 1, pt: isMobile ? 1 : 2, pb: 1 }}>
                <Box sx={{ mb: 0, mt: 1 }}>
                    {renderMenuSection('Inventario', inventoryItems)}
                </Box>

                <Divider variant="middle" sx={{ mx: 2, my: 2, mb: 2.5 }} />

                <Box>
                    {renderMenuSection('Operaciones', operationsItems)}
                </Box>
            </Box>

            <Divider variant="middle" sx={{ mx: 2, my: 2 }} />

            {/* Info usuario */}
            <Box sx={{ px: 2, mb: isMobile ? 2 : 3, mt: 1 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        backgroundColor: 'grey.50',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        cursor: 'pointer'
                    }}
                    onClick={() => setOpenInfoUsuario(true)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 40, height: 40, backgroundColor: '#0B2240' }}>
                            <AccountCircle />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Nombre Apellido
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                usuario@email.com
                            </Typography>
                        </Box>
                        <IconButton size="small">
                            <Settings fontSize="small" />
                        </IconButton>
                    </Box>
                </Paper>
            </Box>

            <InfoUsuario open={openInfoUsuario} onClose={() => setOpenInfoUsuario(false)} />
        </Box>
    );
};

export default Sidebar;
