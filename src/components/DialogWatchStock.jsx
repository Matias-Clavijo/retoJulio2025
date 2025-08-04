import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
  Chip,
  Paper,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

export default function DialogWatchStock({ open, onClose, stock }) {
  if (!stock) return null;

  const getQuantityChip = (quantity) => {
    let color = 'default';
    let icon = '📦';
    
    if (quantity === 0) {
      color = 'error';
      icon = '❌';
    } else if (quantity < 10) {
      color = 'warning';
      icon = '⚠️';
    } else if (quantity >= 50) {
      color = 'success';
      icon = '✅';
    } else {
      color = 'primary';
      icon = '📦';
    }

    return (
      <Chip
        label={`${icon} ${quantity} unidades`}
        color={color}
        variant="filled"
        size="large"
        sx={{ 
          fontWeight: 'bold',
          fontSize: '1rem',
          height: 40
        }}
      />
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
        <Inventory2Icon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Detalles del Stock
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ p: 3 }}>
        {/* ID del Stock */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>
            Stock ID: #{stock.original?.id || stock.id}
          </Typography>
        </Box>

        {/* Información del Producto */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
            <CategoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Información del Producto
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Producto</Typography>
              <Typography variant="body1" fontWeight="medium">
                {stock.producto || stock.original?.product?.name || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Marca</Typography>
              <Typography variant="body1" fontWeight="medium">
                <LocalOfferIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                {stock.marca || stock.original?.product?.brand?.name || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Categoría</Typography>
              <Typography variant="body1" fontWeight="medium">
                {stock.categoria || stock.original?.product?.category?.name || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Descripción</Typography>
              <Typography variant="body1" fontWeight="medium">
                {stock.original?.product?.description || 'Sin descripción'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Información del Depósito */}
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f0f7ff' }}>
          <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
            <WarehouseIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Información del Depósito
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Depósito</Typography>
              <Typography variant="body1" fontWeight="medium">
                {stock.deposito || stock.original?.deposit?.name || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Ubicación</Typography>
              <Typography variant="body1" fontWeight="medium">
                <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                {stock.ubicacion || stock.original?.deposit?.location || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Descripción del Depósito</Typography>
              <Typography variant="body1" fontWeight="medium">
                {stock.original?.deposit?.description || 'Sin descripción'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Cantidad en Stock */}
        <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff8e1', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
            Cantidad en Stock
          </Typography>
          {getQuantityChip(stock.cantidad || stock.original?.quantity || 0)}
        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Información Técnica */}
        <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
            Información Técnica
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Fecha de Creación</Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(stock.original?.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Última Actualización</Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(stock.original?.updatedAt)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">ID del Producto</Typography>
              <Typography variant="body1" fontWeight="medium">
                #{stock.original?.product?.id || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">ID del Depósito</Typography>
              <Typography variant="body1" fontWeight="medium">
                #{stock.original?.deposit?.id || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
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
          CERRAR
        </Button>
      </DialogActions>
    </Dialog>
  );
} 