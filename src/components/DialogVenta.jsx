import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../components/ConfirmDialog'; // ajustá si es necesario

const primaryColor = '#0B2240';  // Azul Brava Store
const accentColor = '#F5C518';   // Amarillo Brava Store

export default function AgregarVentaDialog({ open, onClose, sale, onAddButtonClick }) {
    const [producto, setProducto] = useState('');
    const [total, setTotal] = useState('');
    const [moneda, setMoneda] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [fecha, setFecha] = useState('');
    const [revendedor, setRevendedor] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (sale) {
            setProducto(sale.product?.id || '');
            setTotal(sale.price?.value || '');
            setMoneda(sale.price?.currency || '');
            setMetodoPago(sale.paymentMethod || '');
            setFecha(sale.date || '');
            setRevendedor(sale.reseller || '');
        } else {
            setProducto('');
            setTotal('');
            setMoneda('');
            setMetodoPago('');
            setFecha('');
            setRevendedor('');
        }
    }, [sale]);

    const handleGuardar = () => {
        const nuevaVenta = { producto, total, moneda, metodoPago, fecha, revendedor };
        console.log('Venta guardada:', nuevaVenta);
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
                {/* Header personalizado */}
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

                <DialogContent dividers>
                    <TextField
                        label="Producto *"
                        fullWidth
                        margin="dense"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                    />

                    <TextField
                        label="Total *"
                        type="number"
                        fullWidth
                        margin="dense"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                    />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Moneda</InputLabel>
                        <Select
                            value={moneda}
                            label="Moneda"
                            onChange={(e) => setMoneda(e.target.value)}
                        >
                            <MenuItem value="UY">UY</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="BR">BR</MenuItem>
                            <MenuItem value="ARG">ARG</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Método de pago *"
                        fullWidth
                        margin="dense"
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    />

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
