import React, { useState } from 'react';
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
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../components/ConfirmDialog'; // ajustá la ruta si es necesario

const AgregarStock = ({ open, onClose, onSave }) => {
    const [producto, setProducto] = useState('');
    const [deposito, setDeposito] = useState('');
    const [tipo, setTipo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [depositoDestino, setDepositoDestino] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const primaryColor = '#0B2240';
    const accentColor = '#F5C518';

    const handleSubmit = async () => {
        if (!producto || !deposito || !tipo || !cantidad) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        const nuevoStock = {
            productId: parseInt(producto), // Convert to ID format expected by API
            depositId: parseInt(deposito), // Convert to ID format expected by API
            tipo: tipo, // 'Entrada' or 'Salida'
            cantidad: parseInt(cantidad),
            ...(tipo === 'Transferencia' && { referenceDepositId: parseInt(depositoDestino) })
        };

        try {
            if (onSave) {
                await onSave(nuevoStock);
            }
            // Reset form
            setProducto('');
            setDeposito('');
            setTipo('');
            setCantidad('');
            setDepositoDestino('');
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
                        <InputLabel>Producto</InputLabel>
                        <Select
                            value={producto}
                            label="Producto"
                            onChange={(e) => setProducto(e.target.value)}
                        >
                            <MenuItem value={1}>HP Notebook</MenuItem>
                            <MenuItem value={2}>Dell Laptop</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Depósito</InputLabel>
                        <Select
                            value={deposito}
                            label="Depósito"
                            onChange={(e) => setDeposito(e.target.value)}
                        >
                            <MenuItem value={1}>Central Warehouse</MenuItem>
                            <MenuItem value={2}>Depósito Norte</MenuItem>
                        </Select>
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
                            <InputLabel>Depósito destino</InputLabel>
                            <Select
                                value={depositoDestino}
                                label="Depósito destino"
                                onChange={(e) => setDepositoDestino(e.target.value)}
                            >
                                <MenuItem value={1}>Central Warehouse</MenuItem>
                                <MenuItem value={2}>Depósito Norte</MenuItem>
                            </Select>
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
