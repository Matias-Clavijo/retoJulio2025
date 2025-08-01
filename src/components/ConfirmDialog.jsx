import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
    const accentColor = '#F5C518';

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || '¿Estás seguro?'}</DialogTitle>
            <DialogContent>
                <Typography>{message || 'Esta acción no se puede deshacer.'}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        onConfirm();
                        onClose();
                    }}
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
                    CONFIRMAR
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
