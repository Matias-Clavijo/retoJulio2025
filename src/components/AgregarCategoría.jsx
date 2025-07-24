import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AgregarCategoriaDialog({ open, onClose }) {
    const [nombre, setNombre] = useState('');

    const handleGuardar = () => {
        if (nombre.trim()) {
            console.log('Categoría guardada:', nombre);
            onClose();
            setNombre('');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Agregar Categoría
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
                    autoFocus
                    margin="dense"
                    label="Nombre de la categoría *"
                    fullWidth
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" fullWidth onClick={handleGuardar}>
                    GUARDAR CATEGORÍA
                </Button>
            </DialogActions>
        </Dialog>
    );
}
