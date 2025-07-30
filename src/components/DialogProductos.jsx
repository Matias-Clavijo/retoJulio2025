import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Typography,
    IconButton,
<<<<<<< Updated upstream
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    Chip,
    Divider
=======
>>>>>>> Stashed changes
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const primaryColor = '#0B2240';  // Azul del logo
const accentColor = '#F5C518';   // Amarillo del logo

const currencies = [
    { code: 'UY', label: 'UYU' },
    { code: 'USD', label: 'USD' },
    { code: 'BR', label: 'BRL' },
    { code: 'ARG', label: 'ARS' },
];

export default function AgregarProductoDialog({ open, onClose }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [marca, setMarca] = useState('');
    const [categoria, setCategoria] = useState('');
    const [moneda, setMoneda] = useState('UY');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    
    // Arrays para múltiples precios
    const [preciosCompra, setPreciosCompra] = useState([]);
    const [preciosVenta, setPreciosVenta] = useState([]);

    const handleAgregar = () => {
        console.log({ 
            nombre, 
            descripcion, 
            marca, 
            categoria, 
            moneda, 
            preciosCompra,
            preciosVenta 
        });
        onClose();
    };

    // Agregar precio de compra
    const agregarPrecioCompra = () => {
        if (precioCompra.trim() !== '') {
            const nuevoPrecio = {
                id: Date.now(),
                precio: parseFloat(precioCompra),
                moneda: moneda
            };
            setPreciosCompra([...preciosCompra, nuevoPrecio]);
            setPrecioCompra('');
        }
    };

    // Agregar precio de venta
    const agregarPrecioVenta = () => {
        if (precioVenta.trim() !== '') {
            const nuevoPrecio = {
                id: Date.now(),
                precio: parseFloat(precioVenta),
                moneda: moneda
            };
            setPreciosVenta([...preciosVenta, nuevoPrecio]);
            setPrecioVenta('');
        }
    };

    // Eliminar precio de compra
    const eliminarPrecioCompra = (id) => {
        setPreciosCompra(preciosCompra.filter(p => p.id !== id));
    };

    // Eliminar precio de venta
    const eliminarPrecioVenta = (id) => {
        setPreciosVenta(preciosVenta.filter(p => p.id !== id));
    };

    // Validación de campos requeridos
    const validarMonedasIguales = () => {
        if (preciosCompra.length === 0 || preciosVenta.length === 0) {
            return false;
        }

        const monedasCompra = [...new Set(preciosCompra.map(p => p.moneda))];
        const monedasVenta = [...new Set(preciosVenta.map(p => p.moneda))];

        const todasComprasTienenVenta = monedasCompra.every(moneda => 
            monedasVenta.includes(moneda)
        );

        const todasVentasTienenCompra = monedasVenta.every(moneda => 
            monedasCompra.includes(moneda)
        );

        return todasComprasTienenVenta && todasVentasTienenCompra;
    };

    const getMensajeMonedasFaltantes = () => {
        if (preciosCompra.length === 0 || preciosVenta.length === 0) {
            return null;
        }

        const monedasCompra = [...new Set(preciosCompra.map(p => p.moneda))];
        const monedasVenta = [...new Set(preciosVenta.map(p => p.moneda))];

        const faltanEnVenta = monedasCompra.filter(moneda => !monedasVenta.includes(moneda));
        const faltanEnCompra = monedasVenta.filter(moneda => !monedasCompra.includes(moneda));

        if (faltanEnVenta.length > 0 || faltanEnCompra.length > 0) {
            let mensaje = "⚠️ Monedas faltantes: ";
            if (faltanEnVenta.length > 0) {
                mensaje += `Venta en ${faltanEnVenta.join(', ')}`;
            }
            if (faltanEnCompra.length > 0) {
                if (faltanEnVenta.length > 0) mensaje += " | ";
                mensaje += `Compra en ${faltanEnCompra.join(', ')}`;
            }
            return mensaje;
        }
        return null;
    };

    const isFormValid = nombre.trim() !== '' && 
                       descripcion.trim() !== '' && 
                       preciosCompra.length > 0 && 
                       preciosVenta.length > 0 &&
                       validarMonedasIguales();

    return (
<<<<<<< Updated upstream
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
=======
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
>>>>>>> Stashed changes
                Agregar producto
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

            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="nombre">Nombre *</InputLabel>
                    <OutlinedInput
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        label="Nombre *"
                    />
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="descripcion">Descripción *</InputLabel>
                    <OutlinedInput
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        label="Descripción*"
                    />
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="marca">Marca</InputLabel>
                    <Select
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        label="Marca"
                    >
                        <MenuItem value="Marca 1">Marca 1</MenuItem>
                        <MenuItem value="Marca 2">Marca 2</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="categoria">Categoría</InputLabel>
                    <Select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        label="Categoría"
                    >
                        <MenuItem value="Categoría A">Categoría A</MenuItem>
                        <MenuItem value="Categoría B">Categoría B</MenuItem>
                    </Select>
                </FormControl>

                <Box display="flex" gap={2} mt={2}>
                    <FormControl margin="dense" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="moneda">Moneda</InputLabel>
                        <Select
                            id="moneda"
                            value={moneda}
                            onChange={(e) => setMoneda(e.target.value)}
                            label="Moneda"
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel htmlFor="precio-compra">Precio de Compra</InputLabel>
                        <OutlinedInput
                            id="precio-compra"
                            value={precioCompra}
                            onChange={(e) => setPrecioCompra(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">{moneda}</InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={agregarPrecioCompra}
                                        disabled={!precioCompra.trim()}
                                        size="small"
                                        sx={{ color: primaryColor }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Precio de Compra"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    agregarPrecioCompra();
                                }
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel htmlFor="precio-venta">Precio de Venta</InputLabel>
                        <OutlinedInput
                            id="precio-venta"
                            value={precioVenta}
                            onChange={(e) => setPrecioVenta(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">{moneda}</InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={agregarPrecioVenta}
                                        disabled={!precioVenta.trim()}
                                        size="small"
                                        sx={{ color: primaryColor }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Precio de Venta"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    agregarPrecioVenta();
                                }
                            }}
                        />
                    </FormControl>
                </Box>

                {preciosCompra.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: primaryColor }}>
                            Precios de Compra:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {preciosCompra.map((precio) => (
                                <Chip
                                    key={precio.id}
                                    label={`${precio.moneda} ${precio.precio.toFixed(2)}`}
                                    onDelete={() => eliminarPrecioCompra(precio.id)}
                                    sx={{
                                        backgroundColor: '#e3f2fd',
                                        color: primaryColor,
                                        '& .MuiChip-deleteIcon': {
                                            color: primaryColor
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {preciosVenta.length > 0 && (
                    <Box mt={2}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: primaryColor }}>
                            Precios de Venta:
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                            {preciosVenta.map((precio) => (
                                <Chip
                                    key={precio.id}
                                    label={`${precio.moneda} ${precio.precio.toFixed(2)}`}
                                    onDelete={() => eliminarPrecioVenta(precio.id)}
                                    sx={{
                                        backgroundColor: '#fff3e0',
                                        color: '#e65100',
                                        '& .MuiChip-deleteIcon': {
                                            color: '#e65100'
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                {(preciosCompra.length > 0 || preciosVenta.length > 0) && (
                    <Divider sx={{ mt: 2 }} />
                )}

                {getMensajeMonedasFaltantes() && (
                    <Box mt={2} p={1.5} sx={{ 
                        backgroundColor: '#fff3cd', 
                        border: '1px solid #ffeaa7',
                        borderRadius: 1 
                    }}>
                        <Typography variant="body2" sx={{ color: '#856404' }}>
                            {getMensajeMonedasFaltantes()}
                        </Typography>
                    </Box>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    variant="contained"
                    onClick={handleAgregar}
                    fullWidth
                    disabled={!isFormValid}
                    sx={{
                        backgroundColor: accentColor,
                        color: 'black',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: primaryColor,
                            color: 'white'
                        },
                        '&:disabled': {
                            backgroundColor: '#ccc',
                            color: '#666'
                        }
                    }}
                >
                    AGREGAR PRODUCTO
                </Button>
            </DialogActions>
        </Dialog>
    );
}
