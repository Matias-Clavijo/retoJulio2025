import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    IconButton,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const tiposMovimiento = [
    { value: 'Entrada', label: 'Entrada' },
    { value: 'Salida', label: 'Salida' },
];

export default function DialogStock({ open, onClose }) {
    const [producto, setProducto] = useState('');
    const [deposito, setDeposito] = useState('');
    const [tipo, setTipo] = useState('');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = () => {
        console.log({ producto, deposito, tipo, cantidad });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Nuevo Movimiento de Stock
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
                    select
                    fullWidth
                    label="Producto *"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    margin="dense"
                >
                    <MenuItem value="Producto 1">Producto 1</MenuItem>
                    <MenuItem value="Producto 2">Producto 2</MenuItem>
                    <MenuItem value="Producto 3">Producto 3</MenuItem>
                </TextField>

                <TextField
                    select
                    fullWidth
                    label="Depósito *"
                    value={deposito}
                    onChange={(e) => setDeposito(e.target.value)}
                    margin="dense"
                >
                    <MenuItem value="Depósito 1">Depósito 1</MenuItem>
                    <MenuItem value="Depósito 2">Depósito 2</MenuItem>
                    <MenuItem value="Depósito 3">Depósito 3</MenuItem>
                </TextField>

                <FormControl fullWidth margin="dense">
                    <InputLabel>Tipo de Movimiento *</InputLabel>
                    <Select
                        value={tipo}
                        label="Tipo de Movimiento *"
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        {tiposMovimiento.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Cantidad *"
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    margin="dense"
                    InputProps={{ inputProps: { min: 1 } }}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit} 
                    fullWidth
                    disabled={!producto || !deposito || !tipo || !cantidad}
                >
                    AGREGAR MOVIMIENTO
                </Button>
            </DialogActions>
        </Dialog>
    );
}
