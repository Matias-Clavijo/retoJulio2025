import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    IconButton,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../components/ConfirmDialog'; // Ajustá si tu ruta es distinta

const primaryColor = '#0B2240';  // Azul del logo
const accentColor = '#F5C518';   // Amarillo del logo

const AgregarDeposito = ({ open, onClose, onAddButtonClick}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ubicacion, setUbicacion] = useState('Montevideo, Uruguay');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = () => {
        const nuevoDeposito = { nombre, descripcion, ubicacion };
        onAddButtonClick(nuevoDeposito)
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: 280,
                        minHeight: 420
                    }
                }}
            >
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
                    Agregar depósito
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
                        autoFocus
                        margin="dense"
                        label="Nombre *"
                        fullWidth
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción *"
                        fullWidth
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Ubicación *"
                        fullWidth
                        variant="outlined"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
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
                        AGREGAR DEPÓSITO
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleSubmit}
                title="Confirmar Depósito"
                message="¿Estás seguro de que querés agregar este depósito?"
            />
        </>
    );
};

export default AgregarDeposito;
