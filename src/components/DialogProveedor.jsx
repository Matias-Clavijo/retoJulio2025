import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AgregarProveedorDialog = ({ open, onClose, onSave, proveedorEditar }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (proveedorEditar) {
      setNombre(proveedorEditar.nombre || "");
      setTelefono(proveedorEditar.telefono || "");
      setEmail(proveedorEditar.email || "");
    } else {
      setNombre("");
      setTelefono("");
      setEmail("");
    }
  }, [proveedorEditar]);

  const handleGuardar = () => {
    const nuevoProveedor = {
      id: proveedorEditar?.id, // solo lo usamos si es edición
      nombre,
      telefono,
      email,
    };
    onSave(nuevoProveedor);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          minHeight: 440,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {proveedorEditar ? "Editar Proveedor" : "Agregar Proveedor"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          margin="dense"
          label="Nombre *"
          fullWidth
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          fullWidth
          variant="outlined"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleGuardar}
          sx={{ bgcolor: "#2196f3" }}
        >
          GUARDAR PROVEEDOR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgregarProveedorDialog;
