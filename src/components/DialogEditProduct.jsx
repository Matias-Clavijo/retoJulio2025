import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

export default function DialogEditProduct({ open, onClose, product, onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    marca: "",
    categoria: ""
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.name || "", // fijate que usé name, no producto
        descripcion: product.description || "",
        marca: (product.brand && product.brand.name) || "",
        categoria: (product.category && product.category.name) || ""
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!formData.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    onSave({
      ...product,
      name: formData.nombre,
      description: formData.descripcion,
      brand: { name: formData.marca },
      category: { name: formData.categoria }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: 280, minHeight: 350 } }}>
      <Box
        sx={{
          backgroundColor: primaryColor,
          color: "white",
          fontWeight: "bold",
          px: 2,
          py: 1.5,
          textAlign: "center",
          fontSize: "1rem",
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        Editar Producto
      </Box>

      <DialogContent dividers>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            required
            size="small"
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            size="small"
          />
          <TextField
            label="Marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            fullWidth
            size="small"
          />
          <TextField
            label="Categoría"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          fullWidth
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
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

