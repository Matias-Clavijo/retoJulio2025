import React, { useState, useEffect } from "react";
import { Business } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarProveedorDialog from "../components/DialogProveedor";
import DialogEditProvider from "../components/DialogEditProvider";
import DialogWatchProvider from "../components/DialogWatchProvider";
import Eliminar from "../components/Eliminar";
import { providersAPI } from "../services/api/stockBack";

export default function Proveedor() {
  const [openEliminar, setOpenEliminar] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);

  const [openEditar, setOpenEditar] = useState(false);
  const [proveedorAEditar, setProveedorAEditar] = useState(null);

  const [openVer, setOpenVer] = useState(false);
  const [proveedorAVer, setProveedorAVer] = useState(null); 

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await providersAPI.getProviders();
        if (response?.success) {
          const mappedData = response.data.map((p) => ({
            codigo: p.id,
            nombre: p.name,
            telefono: p.phone,
            email: p.email,
            direccion: p.address,
            associatedDate: p.associatedDate,
          }));
          setRows(mappedData);
          setError(null);
        } else {
          setError(response.error || "Error al cargar los proveedores");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchProveedores();
  }, []);

  const handleEdit = (proveedor) => {
    setProveedorAEditar(proveedor);
    setOpenEditar(true);
  };

  const handleDelete = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setOpenEliminar(true);
  };

  const handleView = (proveedor) => {
    setProveedorAVer(proveedor); 
    setOpenVer(true); 
  };

  const handleConfirmEliminar = () => {
    setRows((prev) => prev.filter((p) => p.codigo !== proveedorAEliminar.codigo));
    setOpenEliminar(false);
    setProveedorAEliminar(null);
  };

  const handleGuardarProveedor = (proveedor) => {
    if (proveedor.codigo) {
      const actualizados = rows.map((p) =>
        p.codigo === proveedor.codigo ? proveedor : p
      );
      setRows(actualizados);
    } else {
      const nuevoCodigo = rows.length ? rows[rows.length - 1].codigo + 1 : 1;
      const nuevoProveedor = { ...proveedor, codigo: nuevoCodigo };
      setRows([...rows, nuevoProveedor]);
    }
    setOpenEditar(false);
    setProveedorAEditar(null);
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
        loading={loading}
        error={error}
      />

      <DialogEditProvider
        open={openEditar}
        onClose={() => {
          setOpenEditar(false);
          setProveedorAEditar(null);
        }}
        provider={proveedorAEditar}
        onSave={handleGuardarProveedor}
      />

      <DialogWatchProvider
        open={openVer}
        onClose={() => {
          setOpenVer(false);
          setProveedorAVer(null);
        }}
        proveedor={proveedorAVer}
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
