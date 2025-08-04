import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Button,
  FormControl,
  TextField,
  MenuItem,
  Autocomplete,
} from '@mui/material';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogEditMovement = ({ open, onClose, movimiento, onSubmit }) => {
  const [productId, setProductId] = useState('');
  const [depositId, setDepositId] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState(["Producto 1", "lolo 2", "Mora 3"]);
  const [deposits, setDeposits] = useState(["Depósito 1", "Depósito 2", "Depósito 3"]);

  // Mantener inputValue para evitar warnings y control total del Autocomplete
  const [productInputValue, setProductInputValue] = useState('');
  const [depositInputValue, setDepositInputValue] = useState('');

  // Estado para la opción seleccionada completa (objeto)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  // Cuando cambia el movimiento, seteamos los valores iniciales
  useEffect(() => {
    if (movimiento) {
      setProductId(movimiento.product?.id || '');
      setDepositId(movimiento.deposit?.id || '');
      setType(movimiento.type || '');
      setQuantity(movimiento.quantity || '');
      setDate(movimiento.date?.slice(0, 10) || '');

      setProductInputValue(movimiento.product?.name || '');
      setDepositInputValue(movimiento.deposit?.name || '');
    }
  }, [movimiento]);

  // Traemos productos y depósitos
  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await productsAPI.getProducts();
      const depRes = await depositsAPI.getDeposits();

      let prods = ["Producto 1", "Producto 2", "Producto 3"] ;
      let deps = ["Depósito 1", "Depósito 2", "Depósito 3"];

      // Si el producto seleccionado no está en la lista, lo agregamos para que aparezca
      if (movimiento?.product && !prods.find(p => p.id === movimiento.product.id)) {
        prods = [...prods, movimiento.product];
      }
      // Igual para depósito
      if (movimiento?.deposit && !deps.find(d => d.id === movimiento.deposit.id)) {
        deps = [...deps, movimiento.deposit];
      }

      setProducts(prods);
      setDeposits(deps);

      // También seteamos selectedProduct y selectedDeposit para que autocomplete lo reconozca
      setSelectedProduct(prods.find(p => p.id === movimiento?.product?.id) || null);
      setSelectedDeposit(deps.find(d => d.id === movimiento?.deposit?.id) || null);
    };
    fetchData();
  }, [movimiento]);

  // Control de cambios en Autocomplete producto
  const handleProductChange = (event, newValue) => {
    setSelectedProduct(newValue);
    setProductId(newValue ? newValue.id : '');
    setProductInputValue(newValue ? newValue.name : '');
  };

  // Control de cambios en Autocomplete depósito
  const handleDepositChange = (event, newValue) => {
    setSelectedDeposit(newValue);
    setDepositId(newValue ? newValue.id : '');
    setDepositInputValue(newValue ? newValue.name : '');
  };

  const handleSubmit = () => {
    const movimientoEditado = {
      id: movimiento.id,
      productId,
      depositId,
      type,
      quantity,
      date,
    };
    onSubmit(movimientoEditado);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: 280, minHeight: 400 } }}>
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
        Editar Movimiento
      </Box>

      <DialogContent dividers>
        {/* Producto */}
        <FormControl fullWidth margin="dense">
          <Autocomplete
            options={products}
            getOptionLabel={(option) => option || ''}
            value={selectedProduct}
            inputValue={productInputValue}
            onInputChange={(event, newInputValue) => setProductInputValue(newInputValue)}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Producto"
                size="small"
                fullWidth
              />
            )}
            freeSolo={false}
          />
        </FormControl>

        {/* Depósito */}
        <FormControl fullWidth margin="dense">
          <Autocomplete
            options={deposits}
            getOptionLabel={(option) => option || ''}
            value={selectedDeposit}
            inputValue={depositInputValue}
            onInputChange={(event, newInputValue) => setDepositInputValue(newInputValue)}
            onChange={handleDepositChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Depósito"
                size="small"
                fullWidth
              />
            )}
            freeSolo={false}
          />
        </FormControl>

        {/* Tipo */}
        <FormControl fullWidth margin="dense">
          <TextField
            select
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            size="small"
          >
            <MenuItem value="IN">Entrada</MenuItem>
            <MenuItem value="OUT">Salida</MenuItem>
          </TextField>
        </FormControl>

        {/* Cantidad */}
        <TextField
          fullWidth
          margin="dense"
          label="Cantidad de productos"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          size="small"
        />

        {/* Fecha */}
        <TextField
          fullWidth
          margin="dense"
          label="Fecha"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            
            backgroundColor: accentColor,
            color: 'black',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: primaryColor,
              color: 'white',
            },
          }}
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogEditMovement;
