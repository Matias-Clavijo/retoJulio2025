import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
    Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from './ConfirmDialog';
import { productsAPI } from '../services/api/stockBack';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

export default function AgregarVentaDialog({ open, onClose, sale, onAddButtonClick }) {
    const [productos, setProductos] = useState([]); // Available products from API
    const [productosSeleccionados, setProductosSeleccionados] = useState([]); // Selected products
    const [productoTemp, setProductoTemp] = useState(null); // Temporary product for autocomplete
    const [metodoPago, setMetodoPago] = useState('');
    const [fecha, setFecha] = useState('');
    const [revendedor, setRevendedor] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Fetch products when dialog opens
    useEffect(() => {
        if (open) {
            fetchProducts();
            // Set current date as default
            if (!fecha) {
                setFecha(new Date().toISOString().split('T')[0]);
            }
        }
    }, [open]);

    // Load sale data for editing
    useEffect(() => {
        if (sale) {
            console.log(sale);
            // For editing existing sales
            if (sale.product) {
                setProductosSeleccionados(sale.product);
            }
            setMetodoPago(sale.paymentMethod || '');
            setFecha(sale.date || '');
            setRevendedor(sale.reseller || '');
        } else {
            // Reset for new sale
            setProductosSeleccionados([]);
            setMetodoPago('');
            setFecha(new Date().toISOString().split('T')[0]);
            setRevendedor('');
        }
    }, [sale]);

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const response = await productsAPI.getProducts();
            console.log(response);
            if (response?.success) {
                setProductos(response.data || []);
            } else {
                console.error('Error fetching products:', response?.error);
                setProductos([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductos([]);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleAgregarProducto = () => {
        // Check if product is already selected
        const isAlreadySelected = productosSeleccionados.some(p => p.id === productoTemp.id);
        
        if (!isAlreadySelected) {
            // Add new product
            setProductosSeleccionados([
                ...productosSeleccionados,
                { ...productoTemp }
            ]);
        }

        // Reset temporary values
        setProductoTemp(null);
    };

    const handleRemoverProducto = (productId) => {
        setProductosSeleccionados(productosSeleccionados.filter(p => p.id !== productId));
    };

    const handleGuardar = () => {
        if (!productosSeleccionados.length) {
            alert('Debes agregar al menos un producto');
            return;
        }

        const ventaData = {
            id: sale?.id,
            product: productosSeleccionados,
            metodoPago: metodoPago,
            fecha: fecha,
            revendedor: revendedor
        };
        
        // Call the appropriate callback
        onAddButtonClick(ventaData);

        setShowConfirm(false);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <Box
                    sx={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        px: 2,
                        py: 1.5,
                        textAlign: 'center',
                        fontSize: '1rem',
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        position: 'relative',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px'
                    }}
                >
                    {sale ? 'Editar venta' : 'Agregar venta'}
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

                <DialogContent dividers sx={{ minHeight: 400 }}>
                    {/* Product Selection Section */}
                    <Typography variant="h6" gutterBottom>
                        Productos
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
                        <Autocomplete
                            sx={{ flex: 1 }}
                            options={productos}
                            getOptionLabel={(option) => option.name || ''}
                            value={productoTemp}
                            onChange={(event, newValue) => setProductoTemp(newValue)}
                            loading={loadingProducts}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Seleccionar Producto"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                            renderOption={(props, option) => (
                                <Box component="li" {...props}>
                                    <Box>
                                        <Typography variant="body2" fontWeight="medium">
                                            {option.name}
                                        </Typography>
                                        {option.description && (
                                            <Typography variant="caption" color="text.secondary">
                                                {option.description}
                                            </Typography>
                                        )}
                                        {option?.salePrices && (
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                💵 {option.salePrices[0]?.currency} - {option.salePrices[0]?.value} 
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            noOptionsText={loadingProducts ? "Cargando productos..." : "No hay productos disponibles"}
                        />
                        
                        <Button
                            variant="contained"
                            onClick={handleAgregarProducto}
                            startIcon={<AddIcon />}
                            disabled={!productoTemp || productosSeleccionados.some(p => p.id === productoTemp?.id)}
                            sx={{
                                backgroundColor: accentColor,
                                color: 'black',
                                '&:hover': { backgroundColor: primaryColor, color: 'white' }
                            }}
                        >
                            Agregar
                        </Button>
                    </Box>

                    {/* Selected Products List */}
                    {productosSeleccionados.length > 0 && (
                        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Productos seleccionados:
                            </Typography>
                            <List dense>
                                {productosSeleccionados.map((producto) => (
                                    <ListItem key={producto.id} sx={{ px: 0 }}>
                                        <ListItemText
                                            primary={producto.name}
                                            secondary={producto.description}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleRemoverProducto(producto.id)}
                                                sx={{ color: '#d32f2f' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}

                    {/* Sale Details Section */}
                    <Typography variant="h6" gutterBottom>
                        Detalles de la Venta
                    </Typography>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Método de Pago</InputLabel>
                        <Select
                            value={metodoPago}
                            label="Método de Pago"
                            onChange={(e) => setMetodoPago(e.target.value)}
                        >
                            <MenuItem value="CARD">Tajerta</MenuItem>
                            <MenuItem value="TRANSFER">Transferencia</MenuItem>
                            <MenuItem value="CASH">Efectivo</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Fecha *"
                        type="date"
                        fullWidth
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />

                    <TextField
                        label="Revendedor *"
                        fullWidth
                        margin="dense"
                        value={revendedor}
                        onChange={(e) => setRevendedor(e.target.value)}
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => setShowConfirm(true)}
                        disabled={!productosSeleccionados.length}
                        sx={{
                            backgroundColor: accentColor,
                            color: 'black',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: primaryColor,
                                color: 'white'
                            }
                        }}
                    >
                        {sale ? 'GUARDAR CAMBIOS' : 'AGREGAR VENTA'}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleGuardar}
                title={sale ? 'Confirmar Cambios' : 'Confirmar Venta'}
                message={sale
                    ? '¿Querés guardar los cambios en esta venta?'
                    : '¿Estás seguro de que querés registrar esta venta?'}
            />
        </>
    );
}
