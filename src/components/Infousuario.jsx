import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
    Avatar,
    Box
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function InfoUsuario({ open, onClose, onLogout }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>Información del Usuario</DialogTitle>

            <DialogContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#0B2240', width: 60, height: 60, mx: 'auto', mb: 2 }}>
                    <AccountCircleIcon sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography variant="body1">
                    <strong>Nombre:</strong> Nombre Apellido
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> usuario@email.com
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button onClick={onClose} variant="contained" color="error">
                    CANCELAR
                </Button>
                <Button onClick={onLogout} variant="outlined" color="#0B2240">
                    CERRAR SESIÓN
                </Button>
            </DialogActions>
        </Dialog>
    );
}
