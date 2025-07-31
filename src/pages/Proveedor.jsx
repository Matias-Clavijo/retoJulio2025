import React, { useState } from "react";
import { Business } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarProveedorDialog from "../components/DialogProveedor";
import Eliminar from '../components/Eliminar';


export default function Proveedor() {
  const [openEliminar, setOpenEliminar] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

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

  const handleEdit = (proveedor) => {
    console.log("Editando proveedor:", proveedor);
  };

  const handleDelete = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setOpenEliminar(true);
  };

  const handleView = (proveedor) => {
    console.log("Viendo proveedor:", proveedor);
  };

  const handleConfirmEliminar = () => {
    setRows(prev => prev.filter(p => p.id !== proveedorAEliminar.id));
    setOpenEliminar(false);
    setProveedorAEliminar(null);
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
  };

  const columns = [
    { id: "codigo", label: "Código", align: "left" },
    { id: "nombre", label: "Nombre", align: "left" },
    { id: "telefono", label: "Teléfono", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "direccion", label: "Dirección", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  return (
    <>
      <DataManagementPage
        title="Gestión de Proveedores"
        description="Administrá los datos de contacto de los proveedores"
        addButtonText="NUEVO PROVEEDOR"
        addButtonIcon={<Business />}
        tableTitle="Lista de Proveedores"
        columns={columns}
        data={rows}
        defaultRowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
        showViewAction={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        addDialog={<AgregarProveedorDialog onSave={handleGuardarProveedor} />}
        loading={false}
        error={null}
      />
      
      <Eliminar
        open={openEliminar}
        onClose={() => setOpenEliminar(false)}
        onConfirm={handleConfirmEliminar}
        title={`¿Estás seguro que deseas eliminar el proveedor "${proveedorAEliminar?.nombre}"?`}
      />
    </>
  );
}

