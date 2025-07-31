import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, IconButton, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const primaryColor = '#0B2240';  // Azul del logo
const accentColor = '#F5C518';   // Amarillo del logo

const DialogWatchProveedor = ({ open, onClose, proveedor }) => {
  if (!proveedor) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          minHeight: 380,
          maxHeight: 550,
        }
      }}
    >
      {/* Encabezado personalizado */}
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
          borderTopRightRadius: '4px',
        }}
      >
        Detalles del Proveedor
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Nombre
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {proveedor.nombre || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Teléfono
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {proveedor.telefono || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Email
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {proveedor.email || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Dirección
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {proveedor.direccion || '-'}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 'medium', color: 'gray' }}>
          Código interno: {proveedor.codigo || '-'}
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

export default DialogWatchProveedor;

