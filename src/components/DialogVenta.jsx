import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AgregarVentaDialog({ open, onClose }) {
    const [producto, setProducto] = useState('');
    const [total, setTotal] = useState('');
    const [moneda, setMoneda] = useState('UY');
    const [metodoPago, setMetodoPago] = useState('');
    const [fecha, setFecha] = useState('');
    const [revendedor, setRevendedor] = useState('');

    const handleGuardar = () => {
        const nuevaVenta = { producto, total, moneda, metodoPago, fecha, revendedor };
        console.log('Venta guardada:', nuevaVenta);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Agregar Venta
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <TextField
                    label="Producto"
                    fullWidth
                    margin="dense"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                />

                <TextField
                    label="Total"
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
                <Button variant="contained" fullWidth onClick={handleGuardar}>
                    AGREGAR VENTA
                </Button>
            </DialogActions>
        </Dialog>
    );
}
