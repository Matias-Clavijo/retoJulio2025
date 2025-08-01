import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    Button
} from '@mui/material';

const DetallesVentaDialog = ({ open, onClose, venta }) => {
    if (!venta) return null;

    return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#001f3f', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
        DETALLES DE LA VENTA
        </DialogTitle>

        <DialogContent sx={{ py: 2, px: 3 }}>
        <Typography variant="body1" fontWeight="bold">Producto</Typography>
            <Typography variant="body2" gutterBottom>
                {venta?.product?.name || `Producto ${venta?.product?.id}` || "Sin producto"}
            </Typography>

            <Typography variant="body1" fontWeight="bold">Método de Pago</Typography>
            <Typography variant="body2" gutterBottom>
                {venta?.paymentMethod || "No disponible"}
            </Typography>

            <Typography variant="body1" fontWeight="bold">Fecha</Typography>
            <Typography variant="body2" gutterBottom>
                {new Date(venta?.date).toLocaleDateString() || "Sin fecha"}
            </Typography>

            <Typography variant="body1" fontWeight="bold">Revendedor</Typography>
            <Typography variant="body2" gutterBottom>
                {venta?.reseller || "Sin nombre"}
            </Typography>

            <Typography variant="body1" fontWeight="bold">Observaciones</Typography>
            <Typography variant="body2" gutterBottom>
                {venta?.notes || "No hay observaciones registradas."}
            </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{
            backgroundColor: '#fcd12a',
            color: '#000',
            '&:hover': {
            backgroundColor: '#e6b800'
            }
        }}>
            Cerrar
        </Button>
        </DialogActions>
    </Dialog>
    );
};

export default DetallesVentaDialog;
