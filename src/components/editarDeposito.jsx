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

const EditarDeposito = ({ open, onClose }) => {
  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [ubicacion, setUbicacion] = React.useState('Montevideo, Uruguay');

  const handleSubmit = () => {
    const depositoEditado = { nombre, descripcion, ubicacion };
    console.log('Depósito editado:', depositoEditado);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          minHeight: 420
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Editar Deposito
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
          <InputLabel>Ubicación</InputLabel>
          <Select
            value={ubicacion}
            label="Ubicación"
            onChange={(e) => setUbicacion(e.target.value)}
          >
            <MenuItem value="Montevideo, Uruguay">Montevideo, Uruguay</MenuItem>
            <MenuItem value="Punta del Este, Uruguay">Punta del Este, Uruguay</MenuItem>
            <MenuItem value="Salto, Uruguay">Salto, Uruguay</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#2196f3' }}
        >
          AGREGAR DEPOSITO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarDeposito;
