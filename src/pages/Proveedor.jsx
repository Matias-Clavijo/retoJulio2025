import React, { useState } from "react";
import TitleHeader from "../components/common/TitelHeader";
import CommonTable from "../components/common/Table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AgregarProveedorDialog from "../components/DialogProveedor"; // Ajustá ruta

export default function Proveedor() {
  const [openAgregarProveedor, setOpenAgregarProveedor] = useState(false);
  const [proveedorEditar, setProveedorEditar] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      codigo: "P001",
      nombre: "Proveedor A",
      telefono: "099123456",
      email: "proveedorA@mail.com",
      direccion: "Rivera 123",
    },
    {
      id: 2,
      codigo: "P002",
      nombre: "Proveedor B",
      telefono: "098654321",
      email: "proveedorB@mail.com",
      direccion: "Salto 456",
    },
  ]);

  const handleEditarProveedor = (proveedor) => {
    setProveedorEditar(proveedor);
    setOpenAgregarProveedor(true);
  };

  const handleGuardarProveedor = (proveedor) => {
    if (proveedor.id) {
      // Modo edición
      const actualizados = rows.map((p) =>
        p.id === proveedor.id ? proveedor : p
      );
      setRows(actualizados);
    } else {
      // Modo creación
      const id = rows.length ? rows[rows.length - 1].id + 1 : 1;
      const nuevoProveedor = { ...proveedor, id };
      setRows([...rows, nuevoProveedor]);
    }

    setOpenAgregarProveedor(false);
    setProveedorEditar(null);
  };

  const generarAcciones = (proveedor) => (
    <>
      <IconButton size="small" onClick={() => handleEditarProveedor(proveedor)}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => alert(`Eliminar proveedor ${proveedor.id}`)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );

  const columns = [
    { id: "codigo", label: "Código", minWidth: 80 },
    { id: "nombre", label: "Nombre", minWidth: 150 },
    { id: "telefono", label: "Teléfono", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 180 },
    { id: "direccion", label: "Dirección", minWidth: 150 },
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
  ];

  return (
    <>
      <AgregarProveedorDialog
        open={openAgregarProveedor}
        onClose={() => {
          setOpenAgregarProveedor(false);
          setProveedorEditar(null);
        }}
        onSave={handleGuardarProveedor}
        proveedorEditar={proveedorEditar}
      />

      <TitleHeader
        title="Gestión de Proveedores"
        description="Administrá los datos de contacto de los proveedores"
        button={
          <Button
            variant="contained"
            onClick={() => {
              setProveedorEditar(null); // Limpia el formulario
              setOpenAgregarProveedor(true);
            }}
          >
            + NUEVO PROVEEDOR
          </Button>
        }
      />

      <CommonTable
        title="Lista de Proveedores"
        columns={columns}
        rows={rows.map((row) => ({
          ...row,
          acciones: generarAcciones(row),
        }))}
        defaultRowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}

