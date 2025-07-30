import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, List, ListItem, ListItemText, Typography, Box, IconButton, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const primaryColor = '#0B2240';  // Azul del logo (igual que EditarDeposito)
const accentColor = '#F5C518';   // Amarillo del logo

const DialogWatchDeposit = ({ open, onClose, deposito }) => {
  if (!deposito) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          minHeight: 420,
          maxHeight: 600,  // opcional, para que no crezca demasiado
        }
      }}
    >
      {/* Header personalizado igual al EditarDeposito */}
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
        Detalles del Depósito
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
          {deposito.name || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Descripción
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {deposito.description || '-'}
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Ubicación
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {deposito.location || '-'}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Productos Asociados ({deposito.products?.length || 0})
        </Typography>

        {deposito.products && deposito.products.length > 0 ? (
          <List dense sx={{ maxHeight: 150, overflowY: 'auto', px: 0 }}>
            {deposito.products.map((prod, index) => (
              <ListItem key={prod.id || index} sx={{ pl: 0 }}>
                <ListItemText
                  primary={prod.name}
                  secondary={prod.code ? `Código: ${prod.code}` : null}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay productos asociados.
          </Typography>
        )}
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

export default DialogWatchDeposit;


