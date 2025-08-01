import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    IconButton,
    Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { brandsAPI, categoriesAPI } from '../services/api/stockBack';

const primaryColor = '#0B2240';  // Azul del logo
const accentColor = '#F5C518';   // Amarillo del logo

export default function AgregarCategoriaDialog({ open, onClose, onAddButtonClick}) {
    const [nombre, setNombre] = useState('');

    const handleGuardar = () => {
        onAddButtonClick({nombre});
        onClose();
        
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
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
                Agregar categoría
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
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGuardar}
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
                    GUARDAR CATEGORÍA
                </Button>
            </DialogActions>
        </Dialog>
    );
}
