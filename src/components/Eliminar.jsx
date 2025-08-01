import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';

const Eliminar = ({ open, onClose, onConfirm, title = "¿Quieres eliminar este producto?" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          padding: 2
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontSize: '1.1rem' }}>
        {title}
      </DialogTitle>

      <DialogActions sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Eliminar;



