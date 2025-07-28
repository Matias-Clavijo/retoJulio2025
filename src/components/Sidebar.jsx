import React, { useState } from 'react';
import {
    Drawer,
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
    IconButton
} from '@mui/material';
import {
    Business,
    Inventory,
    Category,
    LocalOffer,
    Warehouse,
    Store,
    TrendingUp,
    PointOfSale,
    People,
    AccountCircle,
    Settings
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import InfoUsuario from './Infousuario';

const drawerWidth = 280;

const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openInfoUsuario, setOpenInfoUsuario] = useState(false);

    const inventoryItems = [
        { text: 'Productos', icon: <Inventory />, path: '/products' },
        { text: 'Marcas', icon: <LocalOffer />, path: '/brands' },
        { text: 'Categorías', icon: <Category />, path: '/category' },
        { text: 'Depósitos', icon: <Warehouse />, path: '/warehouses' },
        { text: 'Proveedores', icon: <Store />, path: '/suppliers' }
    ];

    const operationsItems = [
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
            <List sx={{ py: 0 }}>
                {items.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            selected={location.pathname === item.path}
                            onClick={() => handleItemClick(item.path)}
                            sx={{
                                mx: 1,
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiListItemIcon-root': {
                                        color: 'primary.contrastText',
                                    },
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'primary.contrastText' : 'text.secondary' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const drawerContent = (
        <Box sx={{
            width: drawerWidth,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Divider variant="middle" />
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Business sx={{ fontSize: 32, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Nombre empresa + logo
                    </Typography>
                </Box>
            </Box>

            <Divider variant="middle" />

            <Box sx={{ flex: 1, py: 2, overflow: 'auto' }}>
                {renderMenuSection('Inventario', inventoryItems)}
                {renderMenuSection('Operaciones', operationsItems)}
            </Box>

            <Box sx={{ p: 2, position: 'relative' }}>
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
                        <Avatar sx={{ width: 40, height: 40, backgroundColor: 'primary.main' }}>
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

    return (
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    border: 'none',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                },
            }}
            open
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;
