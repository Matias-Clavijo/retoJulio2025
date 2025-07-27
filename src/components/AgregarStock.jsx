import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AgregarStock = ({ open, onClose }) => {
  const [producto, setProducto] = useState('');
  const [deposito, setDeposito] = useState('');
  const [tipo, setTipo] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = () => {
    const nuevoStock = {
      producto,
      deposito,
      tipo,
      cantidad
    };
    console.log('Stock agregado:', nuevoStock);
    onClose(); // Cierra el modal
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          minHeight: 460,
          borderRadius: 2,
          p: 2
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Agregar Stock
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <FormControl fullWidth margin="dense">
          <InputLabel>Producto</InputLabel>
          <Select
            value={producto}
            label="Producto"
            onChange={(e) => setProducto(e.target.value)}
          >
            <MenuItem value="Producto A (BADA)">Producto A (BADA)</MenuItem>
            <MenuItem value="Producto B">Producto B</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Depósito</InputLabel>
          <Select
            value={deposito}
            label="Depósito"
            onChange={(e) => setDeposito(e.target.value)}
          >
            <MenuItem value="Depósito 1">Depósito 1</MenuItem>
            <MenuItem value="Depósito 2">Depósito 2</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo</InputLabel>
          <Select
            value={tipo}
            label="Tipo"
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value="Entrada">Entrada</MenuItem>
            <MenuItem value="Salida">Salida</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Cantidad de stock"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#1976d2' }}
        >
          AGREGAR STOCK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarStock;
