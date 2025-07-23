import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AgregarMarca = ({ open, onClose }) => {
  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [pais, setPais] = React.useState('UY');

  const handleSubmit = () => {
    // Acá podés manejar el envío de datos
    const nuevaMarca = { nombre, descripcion, pais };
    console.log('Marca enviada:', nuevaMarca);
    onClose();
  };

  return (
    <Dialog
  open={open}
  onClose={onClose}
  PaperProps={{
    sx: {
      width: 280, // más angosto
      minHeight: 420 // un poco más largo
    }
  }}
>

      <DialogTitle sx={{ m: 0, p: 2 }}>
        Agregar Marca
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
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
        <FormControl fullWidth margin="dense">
          <InputLabel>Pais</InputLabel>
          <Select
            value={pais}
            label="Pais"
            onChange={(e) => setPais(e.target.value)}
          >
            <MenuItem value="UY">UY</MenuItem>
            <MenuItem value="AR">AR</MenuItem>
            <MenuItem value="BR">BR</MenuItem>
            {/* Agregá más si querés */}
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#2196f3' }}
        >
          AGREGAR MARCA
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarMarca;
