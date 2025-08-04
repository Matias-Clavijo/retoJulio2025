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
  const [refetch, setRefetch] = useState(1);

  // Function to fetch providers from API
  const fetchProveedores = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error("Error fetching providers:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, [refetch]);

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

  const handleConfirmEliminar = async () => {
    if (!proveedorAEliminar) return;

    try {
      setLoading(true);
      const response = await providersAPI.deleteProvider(proveedorAEliminar.codigo);
      
      if (response?.success) {
        setRows((prev) => prev.filter((p) => p.codigo !== proveedorAEliminar.codigo));
        setError(null);
      } else {
        setError(response.error || "Error al eliminar el proveedor");
      }
    } catch (error) {
      console.error("Error deleting provider:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      setOpenEliminar(false);
      setProveedorAEliminar(null);
    }
  };

  const handleGuardarProveedor = async (proveedor) => {
    try {
      setLoading(true);
      let response;

      if (proveedor.codigo) {
        // Update existing provider
        response = await providersAPI.updateProvider(proveedor.codigo, proveedor);
      } else {
        // Create new provider
        response = await providersAPI.createProvider(proveedor);
      }

      if (response?.success) {
        setError(null);
      } else {
        setError(response.error || "Error al guardar el proveedor");
      }
      setRefetch(refetch + 1);
    } catch (error) {
      console.error("Error saving provider:", error);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      setOpenEditar(false);
      setProveedorAEditar(null);
    }
  };

  const columns = [
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
        defaultRowsPerPage={10}
        rowsPerPageOptions={[10, 25]}
        showViewAction={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        addDialog={<AgregarProveedorDialog onSave={handleGuardarProveedor} />}
        loading={loading}
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
