import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Autocomplete,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { productsAPI } from '../services/api/stockBack';

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

const DialogEditDeposit = ({ open, onClose, deposito, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('Montevideo, Uruguay');
  
  // Estados para productos
  const [productos, setProductos] = useState([]); // Productos disponibles
  const [productosAsociados, setProductosAsociados] = useState([]); // Productos asociados al depósito
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto temporal para agregar
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Fetch productos disponibles
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

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  useEffect(() => {
    if (deposito) {
      setNombre(deposito.nombre || deposito.name || '');
      setDescripcion(deposito.description || deposito.descripcion || '');
      setUbicacion(deposito.location || deposito.ubicacion || 'Montevideo, Uruguay');
      setProductosAsociados(deposito.productos || deposito.products || []);
    } else {
      setNombre('');
      setDescripcion('');
      setUbicacion('Montevideo, Uruguay');
      setProductosAsociados([]);
    }
  }, [deposito, open]);

  const handleAgregarProducto = () => {
    if (!productoSeleccionado) return;

    // Verificar si el producto ya está asociado
    const yaAsociado = productosAsociados.some(p => p.id === productoSeleccionado.id);
    if (yaAsociado) {
      alert('Este producto ya está asociado al depósito');
      return;
    }

    setProductosAsociados([...productosAsociados, productoSeleccionado]);
    setProductoSeleccionado(null);
  };

  const handleRemoverProducto = (productId) => {
    setProductosAsociados(productosAsociados.filter(p => p.id !== productId));
  };

  const handleSubmit = () => {
    if (!nombre.trim() || !descripcion.trim()) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    const depositoEditado = {
      ...deposito,
      nombre,
      descripcion,
      ubicacion,
      productos: productosAsociados
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
        {/* Información básica del depósito */}
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

        <Divider sx={{ my: 3 }} />

        {/* Sección de productos asociados */}
        <Typography variant="h6" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold' }}>
          Productos Asociados
        </Typography>

        {/* Selector de productos */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-end' }}>
          <Autocomplete
            sx={{ flex: 1 }}
            options={productos}
            getOptionLabel={(option) => option.name || ''}
            value={productoSeleccionado}
            onChange={(event, newValue) => setProductoSeleccionado(newValue)}
            loading={loadingProducts}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Seleccionar Producto"
                variant="outlined"
                size="small"
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
                </Box>
              </Box>
            )}
            noOptionsText={loadingProducts ? "Cargando productos..." : "No hay productos disponibles"}
            disabled={loadingProducts}
          />
          
          <Button
            variant="contained"
            onClick={handleAgregarProducto}
            startIcon={<AddIcon />}
            disabled={!productoSeleccionado || loadingProducts}
            sx={{
              backgroundColor: accentColor,
              color: 'black',
              '&:hover': { backgroundColor: primaryColor, color: 'white' }
            }}
          >
            Agregar
          </Button>
        </Box>

        {/* Lista de productos asociados */}
        {productosAsociados.length > 0 ? (
          <Paper sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
            <Typography variant="subtitle2" gutterBottom sx={{ color: primaryColor, fontWeight: 'bold' }}>
              Productos en este depósito ({productosAsociados.length})
            </Typography>
            <List dense>
              {productosAsociados.map((producto) => (
                <ListItem key={producto.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="medium">
                        {producto.name}
                      </Typography>
                    }
                    secondary={producto.description || 'Sin descripción'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoverProducto(producto.id)}
                      sx={{ color: '#d32f2f' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2" color="text.secondary">
              No hay productos asociados a este depósito
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Usa el selector de arriba para agregar productos
            </Typography>
          </Paper>
        )}
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
