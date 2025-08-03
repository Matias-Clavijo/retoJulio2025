import React, { useState, useEffect } from 'react';
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
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select,
    Chip,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from '../components/ConfirmDialog';
import { brandsAPI, categoriesAPI } from '../services/api/stockBack';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const currencies = [
    { code: 'UY', label: 'UYU' },
    { code: 'USD', label: 'USD' },
    { code: 'BR', label: 'BRL' },
    { code: 'ARG', label: 'ARS' },
];

export default function AgregarProductoDialog({ open, onClose, onAddButtonClick, product, buttonText, title }) {
    const [nombre, setNombre] = useState(product?.name || '');
    const [descripcion, setDescripcion] = useState(product?.description || '');
    const [marca, setMarca] = useState(product?.brand?.id || '');
    const [categoria, setCategoria] = useState(product?.category?.id || '');
    const [moneda, setMoneda] = useState(product?.purchasePrices?.[0]?.currency || 'UY');
    const [precioCompra, setPrecioCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [preciosCompra, setPreciosCompra] = useState(product?.purchasePrices?.map(price => ({ id: price.id, precio: price.value, moneda: price.currency })) || []);
    const [preciosVenta, setPreciosVenta] = useState(product?.salePrices?.map(price => ({ id: price.id, precio: price.value, moneda: price.currency })) || []);

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (product) {
            setNombre(product?.name || '');
            setDescripcion(product?.description || '');
            setMarca(product?.brand?.id || '');
            setCategoria(product?.category?.id || '');
            setMoneda(product?.purchasePrices?.[0]?.currency || 'UY');
            setPreciosCompra(product?.purchasePrices?.map(price => ({ id: price.id, precio: price.value, moneda: price.currency })) || []);
            setPreciosVenta(product?.salePrices?.map(price => ({ id: price.id, precio: price.value, moneda: price.currency })) || []);
        }
    }, [product]);

    const handleAgregar = () => {
        onAddButtonClick({ nombre, descripcion, marca, categoria, moneda, preciosCompra, preciosVenta });
        if (onClose) onClose();
    };

    const agregarPrecioCompra = () => {
        if (precioCompra.trim() !== '') {
            const nuevoPrecio = { id: Date.now(), precio: parseFloat(precioCompra), moneda };
            setPreciosCompra([...preciosCompra, nuevoPrecio]);
            setPrecioCompra('');
        }
    };

    const agregarPrecioVenta = () => {
        if (precioVenta.trim() !== '') {
            const nuevoPrecio = { id: Date.now(), precio: parseFloat(precioVenta), moneda };
            setPreciosVenta([...preciosVenta, nuevoPrecio]);
            setPrecioVenta('');
        }
    };

    const eliminarPrecioCompra = id => setPreciosCompra(preciosCompra.filter(p => p.id !== id));
    const eliminarPrecioVenta = id => setPreciosVenta(preciosVenta.filter(p => p.id !== id));

    const validarMonedasIguales = () => {
        if (!preciosCompra.length || !preciosVenta.length) return false;
        const monedasCompra = [...new Set(preciosCompra.map(p => p.moneda))];
        const monedasVenta = [...new Set(preciosVenta.map(p => p.moneda))];
        return monedasCompra.every(m => monedasVenta.includes(m)) && monedasVenta.every(m => monedasCompra.includes(m));
    };

    const getMensajeMonedasFaltantes = () => {
        if (!preciosCompra.length || !preciosVenta.length) return null;
        const monedasCompra = [...new Set(preciosCompra.map(p => p.moneda))];
        const monedasVenta = [...new Set(preciosVenta.map(p => p.moneda))];
        const faltanEnVenta = monedasCompra.filter(m => !monedasVenta.includes(m));
        const faltanEnCompra = monedasVenta.filter(m => !monedasCompra.includes(m));
        if (faltanEnVenta.length || faltanEnCompra.length) {
            let msg = '⚠️ Monedas faltantes: ';
            if (faltanEnVenta.length) msg += `Venta en ${faltanEnVenta.join(', ')}`;
            if (faltanEnCompra.length) msg += `${faltanEnVenta.length ? ' | ' : ''}Compra en ${faltanEnCompra.join(', ')}`;
            return msg;
        }
        return null;
    };

    const isFormValid = nombre.trim() && descripcion.trim() && preciosCompra.length && preciosVenta.length && validarMonedasIguales();

    useEffect(() => {
        const fetchBrands = async () => {
            const response = await brandsAPI.getBrands();
            setBrands(response?.data);
        };

        const fetchCategories = async () => {
            const response = await categoriesAPI.getCategories();
            setCategories(response?.data);
        };

        fetchBrands();
        fetchCategories();
    }, []);

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <Box sx={{ backgroundColor: primaryColor, color: 'white', fontWeight: 'bold', px: 2, py: 1.5, textAlign: 'center', fontSize: '1rem', letterSpacing: 1, textTransform: 'uppercase', position: 'relative', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
                    {title}
                    <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent>
                    {/* Campos básicos */}
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Nombre *</InputLabel>
                        <OutlinedInput value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre *" />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Descripción *</InputLabel>
                        <OutlinedInput value={descripcion} onChange={(e) => setDescripcion(e.target.value)} label="Descripción *" />
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Marca</InputLabel>
                        <Select value={marca} onChange={(e) => setMarca(e.target.value)} label="Marca">
                            {brands.map(brand => (
                                <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Categoría</InputLabel>
                        <Select value={categoria} onChange={(e) => setCategoria(e.target.value)} label="Categoría">
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Precios */}
                    <Box display="flex" gap={2} mt={2}>
                        <FormControl margin="dense" sx={{ width: '30%' }}>
                            <InputLabel>Moneda</InputLabel>
                            <Select value={moneda} onChange={(e) => setMoneda(e.target.value)} label="Moneda">
                                {currencies.map(opt => (
                                    <MenuItem key={opt.code} value={opt.code}>{opt.code}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel>Precio de Compra</InputLabel>
                            <OutlinedInput
                                value={precioCompra}
                                onChange={(e) => setPrecioCompra(e.target.value)}
                                startAdornment={<InputAdornment position="start">{moneda}</InputAdornment>}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={agregarPrecioCompra} disabled={!precioCompra.trim()} size="small" sx={{ color: primaryColor }}>
                                            <AddIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onKeyPress={(e) => e.key === 'Enter' && agregarPrecioCompra()}
                                label="Precio de Compra"
                            />
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel>Precio de Venta</InputLabel>
                            <OutlinedInput
                                value={precioVenta}
                                onChange={(e) => setPrecioVenta(e.target.value)}
                                startAdornment={<InputAdornment position="start">{moneda}</InputAdornment>}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={agregarPrecioVenta} disabled={!precioVenta.trim()} size="small" sx={{ color: primaryColor }}>
                                            <AddIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onKeyPress={(e) => e.key === 'Enter' && agregarPrecioVenta()}
                                label="Precio de Venta"
                            />
                        </FormControl>
                    </Box>

                    {/* Chips de precios */}
                    {preciosCompra.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: primaryColor }}>Precios de Compra:</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {preciosCompra.map(p => (
                                    <Chip key={p.id} label={`${p.moneda} ${p.precio.toFixed(2)}`} onDelete={() => eliminarPrecioCompra(p.id)} sx={{ backgroundColor: '#e3f2fd', color: primaryColor }} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {preciosVenta.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: primaryColor }}>Precios de Venta:</Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {preciosVenta.map(p => (
                                    <Chip key={p.id} label={`${p.moneda} ${p.precio.toFixed(2)}`} onDelete={() => eliminarPrecioVenta(p.id)} sx={{ backgroundColor: '#fff3e0', color: '#e65100' }} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    {getMensajeMonedasFaltantes() && (
                        <Box mt={2} p={1.5} sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ color: '#856404' }}>{getMensajeMonedasFaltantes()}</Typography>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => setShowConfirm(true)}
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
                        {buttonText}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleAgregar}
                title={product ? "Confirmar cambios" : "Confirmar producto"}
                message={product ? "¿Querés guardar los cambios en este producto?" : "¿Querés agregar este producto al sistema?"}
            />
        </>
    );
}
