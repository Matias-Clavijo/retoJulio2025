import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function AgregarProveedorDialog({ open, onClose }) {
    const [tipo, setTipo] = useState('Persona');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const handleGuardar = () => {
        const proveedor = { tipo, nombre, apellido, telefono, email };
        console.log('Proveedor guardado:', proveedor);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Agregar Proveedor
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={tipo}
                        label="Tipo"
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <MenuItem value="Persona">Persona</MenuItem>
                        <MenuItem value="Empresa">Empresa</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    margin="dense"
                    label="Nombre *"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                {tipo === 'Persona' && (
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Apellido *"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                )}

                <TextField
                    fullWidth
                    margin="dense"
                    label="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />

                <TextField
                    fullWidth
                    margin="dense"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" fullWidth onClick={handleGuardar}>
                    GUARDAR PROVEEDOR
                </Button>
            </DialogActions>
        </Dialog>
    );
}
