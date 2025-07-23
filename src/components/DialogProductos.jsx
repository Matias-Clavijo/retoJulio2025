import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    const [precio, setPrecio] = useState('');

    const handleAgregar = () => {
        // Aquí podrías enviar los datos al backend
        console.log({ nombre, descripcion, marca, categoria, moneda, precio });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Agregar producto
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
                    label="Nombre *"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Descripción *"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    margin="dense"
                />
                <TextField
                    fullWidth
                    label="Marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    margin="dense"
                    select
                >
                    <MenuItem value="Marca 1">Marca 1</MenuItem>
                    <MenuItem value="Marca 2">Marca 2</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    label="Categoría"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    margin="dense"
                    select
                >
                    <MenuItem value="Categoría A">Categoría A</MenuItem>
                    <MenuItem value="Categoría B">Categoría B</MenuItem>
                </TextField>
                <Box display="flex" gap={2} mt={2}>
                    <TextField
                        select
                        label="Moneda"
                        value={moneda}
                        onChange={(e) => setMoneda(e.target.value)}
                        sx={{ width: '30%' }}
                    >
                        {currencies.map((option) => (
                            <MenuItem key={option.code} value={option.code}>
                                {option.code}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        label="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        InputProps={{ startAdornment: <Typography mr={1}>{moneda} </Typography> }}
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" onClick={handleAgregar} fullWidth>
                    AGREGAR PRODUCTO
                </Button>
            </DialogActions>
        </Dialog>
    );
}
