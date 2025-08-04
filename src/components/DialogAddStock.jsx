import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Autocomplete,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from './ConfirmDialog';
import { productsAPI, depositsAPI } from '../services/api/stockBack';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogAddStock = ({ open, onClose, onAddButtonClick, stock = null }) => {
  const [productos, setProductos] = useState([]);
  const [depositos, setDepositos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [depositoSeleccionado, setDepositoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingDeposits, setLoadingDeposits] = useState(false);

  // Determinar si es modo edición
  const isEditing = stock !== null;

  // Fetch productos y depósitos cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      fetchProducts();
      fetchDeposits();
      
      if (isEditing && stock) {
        // Llenar formulario con datos existentes para edición
        setCantidad(stock.cantidad?.toString() || stock.original?.quantity?.toString() || '');
      } else {
        // Reset form para crear nuevo
        setProductoSeleccionado(null);
        setDepositoSeleccionado(null);
        setCantidad('');
      }
    }
  }, [open, isEditing, stock]);

  // Seleccionar producto y depósito cuando los datos estén disponibles en modo edición
  useEffect(() => {
    if (isEditing && stock && productos.length > 0 && depositos.length > 0) {
      // Buscar y seleccionar el producto
      const producto = productos.find(p => 
        p.name === stock.producto || 
        p.id === stock.original?.product?.id
      );
      if (producto) {
        setProductoSeleccionado(producto);
      }

      // Buscar y seleccionar el depósito
      const deposito = depositos.find(d => 
        d.name === stock.deposito || 
        d.id === stock.original?.deposit?.id
      );
      if (deposito) {
        setDepositoSeleccionado(deposito);
      }
    }
  }, [isEditing, stock, productos, depositos]);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await productsAPI.getProducts();
      if (response?.success) {
        setProductos(response.data || []);
      } else {
        console.error('Error fetching products:', response?.error);
        setProductos([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductos([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchDeposits = async () => {
    try {
      setLoadingDeposits(true);
      const response = await depositsAPI.getDeposits();
      if (response?.success) {
        setDepositos(response.data || []);
      } else {
        console.error('Error fetching deposits:', response?.error);
        setDepositos([]);
      }
    } catch (error) {
      console.error('Error fetching deposits:', error);
      setDepositos([]);
    } finally {
      setLoadingDeposits(false);
    }
  };

  const handleSubmit = () => {
    if (!productoSeleccionado) {
      alert("Por favor selecciona un producto");
      return;
    }
    if (!depositoSeleccionado) {
      alert("Por favor selecciona un depósito");
      return;
    }
    if (!cantidad || parseInt(cantidad) <= 0) {
      alert("Por favor ingresa una cantidad válida");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const stockData = {
      product: {
        id: productoSeleccionado.id
      },
      deposit: {
        id: depositoSeleccionado.id
      },
      quantity: parseInt(cantidad)
    };

    if (isEditing) {
      // Para edición, incluir el ID del stock
      onAddButtonClick(stock.original?.id || stock.id, stockData);
    } else {
      // Para creación, solo los datos
      onAddButtonClick(stockData);
    }
    
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { minHeight: 500 } }}
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
          {isEditing ? 'Editar Stock' : 'Agregar Stock'}
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
            Información del Stock
          </Typography>

          {/* Selección de Producto */}
          <Autocomplete
            options={productos}
            getOptionLabel={(option) => option.name || ''}
            value={productoSeleccionado}
            onChange={(event, newValue) => setProductoSeleccionado(newValue)}
            loading={loadingProducts}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Producto *"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {option.name}
                  </Typography>
                  {option.description && (
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  )}
                  {option.brand && (
                    <Typography variant="caption" color="primary" display="block">
                      Marca: {option.brand.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            noOptionsText={loadingProducts ? "Cargando productos..." : "No hay productos disponibles"}
          />

          {/* Selección de Depósito */}
          <Autocomplete
            options={depositos}
            getOptionLabel={(option) => option.name || ''}
            value={depositoSeleccionado}
            onChange={(event, newValue) => setDepositoSeleccionado(newValue)}
            loading={loadingDeposits}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Depósito *"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            )}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {option.name}
                  </Typography>
                  {option.description && (
                    <Typography variant="caption" color="text.secondary">
                      {option.description}
                    </Typography>
                  )}
                  {option.location && (
                    <Typography variant="caption" color="secondary" display="block">
                      📍 {option.location}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
            noOptionsText={loadingDeposits ? "Cargando depósitos..." : "No hay depósitos disponibles"}
          />

          <Divider sx={{ my: 2 }} />

          {/* Cantidad */}
          <TextField
            label="Cantidad *"
            type="number"
            fullWidth
            margin="dense"
            variant="outlined"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            inputProps={{ min: 1 }}
            helperText="Ingresa la cantidad de productos a agregar al stock"
          />

          {/* Resumen */}
          {productoSeleccionado && depositoSeleccionado && cantidad && (
            <Box sx={{ mt: 3, p: 2, backgroundColor: '#f0f7ff', borderRadius: 1 }}>
              <Typography variant="subtitle2" sx={{ color: primaryColor, fontWeight: 'bold', mb: 1 }}>
                Resumen
              </Typography>
              <Typography variant="body2">
                <strong>Producto:</strong> {productoSeleccionado.name}
              </Typography>
              <Typography variant="body2">
                <strong>Depósito:</strong> {depositoSeleccionado.name}
              </Typography>
              <Typography variant="body2">
                <strong>Ubicación:</strong> {depositoSeleccionado.location || 'N/A'}
              </Typography>
              <Typography variant="body2">
                <strong>Cantidad:</strong> {cantidad} unidades
              </Typography>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!productoSeleccionado || !depositoSeleccionado || !cantidad || loadingProducts || loadingDeposits}
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
            {isEditing ? 'GUARDAR CAMBIOS' : 'AGREGAR STOCK'}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title={isEditing ? "Confirmar Edición de Stock" : "Confirmar Agregar Stock"}
        message={
          isEditing 
            ? `¿Estás seguro de actualizar el stock a ${cantidad} unidades de "${productoSeleccionado?.name}" en el depósito "${depositoSeleccionado?.name}"?`
            : `¿Estás seguro de agregar ${cantidad} unidades de "${productoSeleccionado?.name}" al depósito "${depositoSeleccionado?.name}"?`
        }
      />
    </>
  );
};

export default DialogAddStock; 