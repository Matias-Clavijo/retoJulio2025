import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogEditDeposit = ({ open, onClose, deposito, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('Montevideo, Uruguay');

  useEffect(() => {
    if (deposito) {
      setNombre(deposito.nombre || deposito.name || '');
      setDescripcion(deposito.description || deposito.descripcion || '');
      setUbicacion(deposito.location || deposito.ubicacion || 'Montevideo, Uruguay');
    } else {
      setNombre('');
      setDescripcion('');
      setUbicacion('Montevideo, Uruguay');
    }
  }, [deposito, open]);

  const handleSubmit = () => {
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    
    const depositoEditado = {
      ...deposito,
      nombre,
      descripcion,
      ubicacion
    };
    onSave(depositoEditado);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { minHeight: 600 } }}
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
          position: 'relative',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px'
        }}
      >
        Editar depósito
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent dividers sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold' }}>
          Información del Depósito
        </Typography>
        
        <TextField
          autoFocus
          margin="dense"
          label="Nombre *"
          fullWidth
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descripción *"
          fullWidth
          variant="outlined"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Ubicación *"
          fullWidth
          variant="outlined"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
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
          GUARDAR CAMBIOS
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditDeposit;
