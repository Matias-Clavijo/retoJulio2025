import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../components/ConfirmDialog';

const primaryColor = '#0B2240';  // Azul del logo
const accentColor = '#F5C518';   // Amarillo del logo

const AgregarProveedorDialog = ({ open, onClose, onSave, proveedorEditar }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (proveedorEditar) {
            setNombre(proveedorEditar.nombre || '');
            setTelefono(proveedorEditar.telefono || '');
            setEmail(proveedorEditar.email || '');
        } else {
            setNombre('');
            setTelefono('');
            setEmail('');
        }
    }, [proveedorEditar]);

    const handleGuardar = () => {
        const nuevoProveedor = {
            id: proveedorEditar?.id,
            nombre,
            telefono,
            email
        };
        onSave(nuevoProveedor);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 280,
                    minHeight: 440
                }
            }}
        >
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
                {proveedorEditar ? 'Editar proveedor' : 'Agregar proveedor'}
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
                    margin="dense"
                    label="Nombre *"
                    fullWidth
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Teléfono"
                    fullWidth
                    variant="outlined"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    {proveedorEditar ? 'EDITAR PROVEEDOR' : 'GUARDAR PROVEEDOR'}
                </Button>
            </DialogActions>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleGuardar}
                title={proveedorEditar ? 'Confirmar Edición' : 'Confirmar Proveedor'}
                message={proveedorEditar ? '¿Deseás guardar los cambios del proveedor?' : '¿Querés guardar este nuevo proveedor?'}
            />
        </Dialog>
    );
};

export default AgregarProveedorDialog;
