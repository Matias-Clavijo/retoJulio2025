import React from 'react';
import {
  Dialog, DialogContent, DialogActions, Typography, Box,
  Button
} from '@mui/material';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogWatchMovements = ({ open, onClose, movimiento }) => {
  if (!movimiento) return null;

  const { product, deposit, type, quantity, date } = movimiento;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          minHeight: 300,
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
        }}
      >
        Detalles del Movimiento
      </Box>

      <DialogContent dividers sx={{ px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Producto
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {product?.name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Depósito
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {deposit?.name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Tipo
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {type === 'IN' ? 'Entrada' : 'Salida'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Cantidad
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {quantity}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Fecha
        </Typography>
        <Typography variant="body2">
          {new Date(date).toLocaleDateString()}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: accentColor,
            color: 'black',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: primaryColor,
              color: 'white',
            },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWatchMovements;
