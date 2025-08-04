import React from 'react';
import {
  Dialog, DialogContent, DialogActions, Typography, Box,
  Button
} from '@mui/material';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogWatchProducts = ({ open, onClose, product }) => {
  if (!product) return null;

  const {
    name,
    description,
    brand,
    category,
    deposits,
    purchasePrices,
    salePrices
  } = product;

  // Función para mostrar lista de precios o depósitos en formato texto
  const formatList = (list) => {
    if (!Array.isArray(list) || list.length === 0) return '-';
    return list.map((item, i) => {
      if (typeof item === 'string') return item;
      if (item.currency && (item.value || item.value === 0)) return `${item.currency} ${item.value}`;
      if (item.name) return item.name;
      return '-';
    }).join(', ');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          minHeight: 350,
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
        Detalles del Producto
      </Box>

      <DialogContent dividers sx={{ px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Nombre
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Descripción
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Marca
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {brand?.name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Categoría
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {category?.name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Depósitos
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {formatList(deposits)}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Precios de compra
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {formatList(purchasePrices)}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Precios de venta
        </Typography>
        <Typography variant="body2">
          {formatList(salePrices)}
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

export default DialogWatchProducts;



