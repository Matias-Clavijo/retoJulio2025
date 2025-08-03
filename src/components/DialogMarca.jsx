import React, { useEffect, useState } from 'react';
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
import ConfirmDialog from '../components/ConfirmDialog'; // Ajustá si es necesario

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const AgregarMarca = ({ open, onClose, onAddButtonClick, brand, buttonText, title }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [pais, setPais] = useState('UY');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = () => {
        const nuevaMarca = { nombre, descripcion, pais };
        onAddButtonClick(nuevaMarca);
        onClose();
    };

    useEffect(() => {
        if (brand) {
            setNombre(brand?.name || '');
            setDescripcion(brand?.description || '');
            setPais(brand?.country || '');
        }
    }, [brand]);

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: 320,
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
                    {title}
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
                    <FormControl fullWidth margin="dense">
                        <InputLabel>País</InputLabel>
                        <Select
                            value={pais}
                            label="País"
                            onChange={(e) => setPais(e.target.value)}
                        >
                            <MenuItem value="UY">UY</MenuItem>
                            <MenuItem value="AR">AR</MenuItem>
                            <MenuItem value="BR">BR</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
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
                        {buttonText}
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleSubmit}
                title={brand ? "Confirmar cambios" : "Confirmar marca"}
                message={brand ? "¿Querés guardar los cambios en esta marca?" : "¿Querés agregar esta marca en el sistema?"}
            />
        </>
    );
};

export default AgregarMarca;
