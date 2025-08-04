import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Box,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    const [precioCompra, setPrecioCompra] = useState(product?.purchasePrices?.[0]?.value || '');
    const [precioVenta, setPrecioVenta] = useState(product?.salePrices?.[0]?.value || '');

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
            setPrecioCompra(product?.purchasePrices?.[0]?.value || '');
            setPrecioVenta(product?.salePrices?.[0]?.value || '');
        } else {
            // Reset para nuevo producto
            setNombre('');
            setDescripcion('');
            setMarca('');
            setCategoria('');
            setMoneda('UY');
            setPrecioCompra('');
            setPrecioVenta('');
        }
    }, [product]);

    const handleAgregar = () => {
        const preciosCompra = [{ precio: parseFloat(precioCompra), moneda }];
        const preciosVenta = [{ precio: parseFloat(precioVenta), moneda }];
        onAddButtonClick({ nombre, descripcion, marca, categoria, moneda, preciosCompra, preciosVenta });
        if (onClose) onClose();
    };

    const isFormValid = nombre?.trim() && 
                        descripcion && 
                        precioCompra && 
                        precioVenta && 
                        !isNaN(parseFloat(precioCompra)) && 
                        !isNaN(parseFloat(precioVenta)) && 
                        parseFloat(precioCompra) > 0 && 
                        parseFloat(precioVenta) > 0;

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
                    {title}trim()
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
                    <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mt={2}>
                        <FormControl margin="dense" sx={{ width: { xs: '100%', sm: '30%' } }}>
                            <InputLabel>Moneda</InputLabel>
                            <Select value={moneda} onChange={(e) => setMoneda(e.target.value)} label="Moneda">
                                {currencies.map(opt => (
                                    <MenuItem key={opt.code} value={opt.code}>{opt.code}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel>Precio de Compra *</InputLabel>
                            <OutlinedInput
                                type="number"
                                value={precioCompra}
                                onChange={(e) => setPrecioCompra(e.target.value)}
                                startAdornment={<InputAdornment position="start">{moneda}</InputAdornment>}
                                label="Precio de Compra *"
                                inputProps={{ min: 0, step: 0.01 }}
                            />
                        </FormControl>

                        <FormControl fullWidth margin="dense">
                            <InputLabel>Precio de Venta *</InputLabel>
                            <OutlinedInput
                                type="number"
                                value={precioVenta}
                                onChange={(e) => setPrecioVenta(e.target.value)}
                                startAdornment={<InputAdornment position="start">{moneda}</InputAdornment>}
                                label="Precio de Venta *"
                                inputProps={{ min: 0, step: 0.01 }}
                            />
                        </FormControl>
                    </Box>
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
