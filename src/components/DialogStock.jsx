import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const productosMock = [
    { id: 1, nombre: 'Producto A (BADA)' },
    { id: 2, nombre: 'Producto B (CODE)' },
    { id: 3, nombre: 'Producto C (ALFA)' }
];

export default function GestionStockDialog({ open, onClose, deposito = 'Depósito A (BBSAD)' }) {
    const [producto, setProducto] = useState('');
    const [stock, setStock] = useState('');

    const handleAceptar = () => {
        console.log({ producto, stock });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Gestión de stock
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {deposito}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField
                    fullWidth
                    select
                    label="Producto"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    margin="dense"
                >
                    {productosMock.map((prod) => (
                        <MenuItem key={prod.id} value={prod.nombre}>
                            {prod.nombre}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Cantidad de stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    margin="dense"
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" onClick={handleAceptar} fullWidth>
                    ACEPTAR
                </Button>
            </DialogActions>
        </Dialog>
    );
}
