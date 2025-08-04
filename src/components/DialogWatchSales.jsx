import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Box,
    Typography,
    Divider,
    Chip,
    Paper,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

export default function DialogWatchSales({ open, onClose, sale }) {
    if (!sale) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getPaymentMethodText = (method) => {
        const paymentMethods = {
            'CARD': 'Tarjeta',
            'TRANSFER': 'Transferencia',
            'CASH': 'Efectivo'
        };
        return paymentMethods[method] || method || 'N/A';
    };

    const getPaymentMethodColor = (method) => {
        const colors = {
            'CARD': 'primary',
            'TRANSFER': 'secondary',
            'CASH': 'success'
        };
        return colors[method] || 'default';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <Box
                sx={{
                    backgroundColor: primaryColor,
                    color: 'white',
                    fontWeight: 'bold',
                    px: 2,
                    py: 1.5,
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    position: 'relative',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px'
                }}
            >
                Detalles de la Venta
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent dividers sx={{ p: 3 }}>
                {/* Sale ID */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                        Venta #{sale.id}
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Products Section */}
                <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ProductionQuantityLimitsIcon sx={{ color: primaryColor, mr: 1 }} />
                        <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                            Productos
                        </Typography>
                    </Box>
                    
                    {sale.producto && Array.isArray(sale.producto) && sale.producto.length > 0 ? (
                        <List dense>
                            {sale.producto.map((product, index) => (
                                <ListItem key={index} sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body1" fontWeight="medium">
                                                {product.name || product.producto || 'Producto sin nombre'}
                                            </Typography>
                                        }
                                        secondary={
                                            <Box>
                                                {product.description && (
                                                    <Typography variant="body2" color="text.secondary">
                                                        {product.description}
                                                    </Typography>
                                                )}
                                                {product.salePrices && product.salePrices.length > 0 && (
                                                    <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                                                        💰 {product.salePrices[0].currency} {product.salePrices[0].value}
                                                    </Typography>
                                                )}
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No hay productos registrados
                        </Typography>
                    )}
                </Paper>

                {/* Sale Details Grid */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    {/* Payment Method */}
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PaymentIcon sx={{ color: primaryColor, mr: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                                Método de Pago
                            </Typography>
                        </Box>
                        <Chip 
                            label={getPaymentMethodText(sale.metodoPago)} 
                            color={getPaymentMethodColor(sale.metodoPago)}
                            variant="outlined"
                            sx={{ fontWeight: 'medium' }}
                        />
                    </Paper>

                    {/* Date */}
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CalendarTodayIcon sx={{ color: primaryColor, mr: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                                Fecha de Venta
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            {sale.fecha || formatDate(sale.original?.date) || 'N/A'}
                        </Typography>
                    </Paper>

                    {/* Reseller */}
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PersonIcon sx={{ color: primaryColor, mr: 1 }} />
                            <Typography variant="subtitle2" sx={{ color: primaryColor, fontWeight: 'bold' }}>
                                Revendedor
                            </Typography>
                        </Box>
                        <Typography variant="body1">
                            {sale.revendedor || 'N/A'}
                        </Typography>
                    </Paper>
                </Box>

                {/* Additional Information */}
                {sale.original && (
                    <Paper sx={{ p: 2, mt: 3, backgroundColor: '#f0f7ff' }}>
                        <Typography variant="subtitle2" sx={{ color: primaryColor, fontWeight: 'bold', mb: 1 }}>
                            Información Técnica
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            ID interno: {sale.original.id}
                        </Typography>
                        {sale.original.createdAt && (
                            <Typography variant="body2" color="text.secondary">
                                Creado: {formatDate(sale.original.createdAt)}
                            </Typography>
                        )}
                        {sale.original.updatedAt && (
                            <Typography variant="body2" color="text.secondary">
                                Actualizado: {formatDate(sale.original.updatedAt)}
                            </Typography>
                        )}
                    </Paper>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    variant="contained"
                    onClick={onClose}
                    fullWidth
                    sx={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: accentColor,
                            color: 'black'
                        }
                    }}
                >
                    CERRAR
                </Button>
            </DialogActions>
        </Dialog>
    );
} 