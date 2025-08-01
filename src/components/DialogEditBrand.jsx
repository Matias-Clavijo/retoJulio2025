import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogActions, Typography, Box,
  Button, TextField
} from '@mui/material';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogEditBrand = ({ open, onClose, brand, onSave }) => {
  // Estados locales para los inputs
  const [nombre, setNombre] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');

  // Cuando cambia la marca que viene como prop, actualizar estados
  useEffect(() => {
    if (brand) {
      setNombre(brand.name || '');
      setDescription(brand.description || '');
      setCountry(brand.country || '');
    }
  }, [brand]);

  const handleSave = () => {
    // Validación simple: nombre obligatorio
    if (!nombre.trim()) return alert('El nombre es obligatorio');
    onSave({
      id: brand.id,
      name: nombre.trim(),
      description: description.trim(),
      country: country.trim()
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 300,
          minHeight: 320,
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
        Editar Marca
      </Box>

      <DialogContent dividers sx={{ px: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Nombre
        </Typography>
        <TextField
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Descripción
        </Typography>
        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          País de origen
        </Typography>
        <TextField
          fullWidth
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          variant="outlined"
          size="small"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#ccc',
            color: '#000',
            fontWeight: 'bold',
            textTransform: 'none',
            mr: 1,
            '&:hover': {
              backgroundColor: '#bbb',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditBrand;

