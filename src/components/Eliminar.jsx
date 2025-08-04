import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';

const Eliminar = ({ open, onClose, onConfirm, title = "¿Quieres eliminar este producto?" }) => {
  const primaryColor = '#0B2240';

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
          <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: primaryColor,
                borderColor: primaryColor,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: primaryColor,
                  color: 'white'
                }
              }}
          >
            CANCELAR
          </Button>
          <Button
              variant="contained"
              onClick={onConfirm}
              sx={{
                backgroundColor: '#d32f2f',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#b71c1c'
                }
              }}
          >
            ELIMINAR
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default Eliminar;
