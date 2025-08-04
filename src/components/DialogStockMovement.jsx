import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
    Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../components/ConfirmDialog';
import { productsAPI, depositsAPI } from '../services/api/stockBack';

const AgregarStock = ({ open, onClose, onSave, movement }) => {
    const [id, setId] = useState(null)
    const [producto, setProducto] = useState(null);
    const [deposito, setDeposito] = useState(null);
    const [tipo, setTipo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [depositoDestino, setDepositoDestino] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [productos, setProductos] = useState([]);
    const [depositos, setDepositos] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [loadingDeposits, setLoadingDeposits] = useState(false);

    const primaryColor = '#0B2240';
    const accentColor = '#F5C518';

    // Fetch products and deposits when component mounts or opens
    useEffect(() => {
        if (open) {
            if (movement) {
                setId(movement?.id)
                setProducto(movement?.product);
                setDeposito(movement?.originDeposit);
                const tipo = movement?.type === 'ENTRY' ? 'Entrada' : movement?.type === 'TRANSFER' ? 'Transferencia' : 'Salida';
                setTipo(tipo);
                setCantidad(movement?.quantity);
                setDepositoDestino(movement?.destinationDeposit);
            }
            fetchProducts();
            fetchDeposits();
        }
    }, [open]);

    const fetchProducts = async () => {
        try {
            setLoadingProducts(true);
            const response = await productsAPI.getProducts();
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

    const fetchDeposits = async () => {
        try {
            setLoadingDeposits(true);
            const response = await depositsAPI.getDeposits();
            if (response?.success) {
                setDepositos(response.data || []);
            } else {
                console.error('Error fetching deposits:', response?.error);
                setDepositos([]);
            }
        } catch (error) {
            console.error('Error fetching deposits:', error);
            setDepositos([]);
        } finally {
            setLoadingDeposits(false);
        }
    };

    const handleSubmit = async () => {
        if (!producto || !deposito || !tipo || !cantidad) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        if (tipo === 'Transferencia' && !depositoDestino) {
            alert('Por favor selecciona un depósito destino para la transferencia');
            return;
        }

        const nuevoStock = {
            id: id,
            productId: producto.id, // Use the selected product's ID
            depositId: deposito.id, // Use the selected deposit's ID
            tipo: tipo, // 'Entrada' or 'Salida'
            cantidad: parseInt(cantidad),
            ...(tipo === 'Transferencia' && { referenceDepositId: depositoDestino.id })
        };

        try {
            if (onSave) {
                await onSave(nuevoStock);
            }
            // Reset form
            setProducto(null);
            setDeposito(null);
            setTipo('');
            setCantidad('');
            setDepositoDestino(null);
            setShowConfirm(false);
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error saving stock movement:', error);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                {/* HEADER PERSONALIZADO */}
                <Box
                    sx={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        px: 2,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Nuevo Movimiento de Stock
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{ position: 'absolute', right: 8, top: 4, color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent dividers>
                    <FormControl fullWidth margin="dense">
                        <Autocomplete
                            options={productos}
                            getOptionLabel={(option) => option.name || ''}
                            value={producto}
                            onChange={(event, newValue) => setProducto(newValue)}
                            loading={loadingProducts}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Producto"
                                    variant="outlined"
                                    fullWidth
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
                                    </Box>
                                </Box>
                            )}
                            noOptionsText={loadingProducts ? "Cargando productos..." : "No hay productos disponibles"}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <Autocomplete
                            options={depositos}
                            getOptionLabel={(option) => option.name || ''}
                            value={deposito}
                            onChange={(event, newValue) => setDeposito(newValue)}
                            loading={loadingDeposits}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Depósito"
                                    variant="outlined"
                                    fullWidth
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
                                        {option.location && (
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                📍 {option.location}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                            noOptionsText={loadingDeposits ? "Cargando depósitos..." : "No hay depósitos disponibles"}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Tipo de Movimiento</InputLabel>
                        <Select
                            value={tipo}
                            label="Tipo de Movimiento"
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <MenuItem value="Entrada">Entrada</MenuItem>
                            <MenuItem value="Salida">Salida</MenuItem>
                            <MenuItem value="Transferencia">Transferencia</MenuItem>
                        </Select>
                    </FormControl>

                    {tipo === 'Transferencia' && (
                        <FormControl fullWidth margin="dense">
                            <Autocomplete
                                options={depositos.filter(dep => dep.id !== deposito?.id)} // Exclude current deposit
                                getOptionLabel={(option) => option.name || ''}
                                value={depositoDestino}
                                onChange={(event, newValue) => setDepositoDestino(newValue)}
                                loading={loadingDeposits}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Depósito destino"
                                        variant="outlined"
                                        fullWidth
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
                                            {option.location && (
                                                <Typography variant="caption" color="text.secondary" display="block">
                                                    📍 {option.location}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                )}
                                noOptionsText={loadingDeposits ? "Cargando depósitos..." : "No hay depósitos disponibles"}
                            />
                        </FormControl>
                    )}

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Cantidad de stock"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        inputProps={{ min: 1 }}
                    />
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowConfirm(true)}
                        sx={{
                            backgroundColor: accentColor,
                            color: 'black',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#e6b800',
                            },
                        }}
                    >
                        AGREGAR MOVIMIENTO
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleSubmit}
                title="Confirmar Movimiento"
                message="¿Estás seguro de que querés agregar este movimiento de stock?"
            />
        </>
    );
};

export default AgregarStock;
