import React, { useState, useEffect } from "react";
import { Warehouse } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarDeposito from "../components/DialogDeposito.jsx"; // para agregar depósitos
import DialogEditDeposit from "../components/DialogEditDeposit.jsx"; // para editar depósitos
import { depositsAPI } from "../services/api/stockBack";
import Eliminar from "../components/Eliminar";
import DialogWatchDeposit from "../components/DialogWatchDeposit.jsx";

export default function Deposits() {
  const [deposits, setDeposits] = useState([]);
  const [allDeposits, setAllDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [depositoSeleccionado, setDepositoSeleccionado] = useState(null);
  const [openVer, setOpenVer] = useState(false);
  const [refetch, setRefetch] = useState(0);

  // Estados nuevos para editar
  const [openEditar, setOpenEditar] = useState(false);
  const [depositoEditar, setDepositoEditar] = useState(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        setLoading(true);
        const response = await depositsAPI.getDeposits(page, rowsPerPage);
        if (response.success) {
          const transformedDeposits = response.data.map((deposit) => ({
            nombre: deposit.name,
            description: deposit.description,
            location: deposit.location,
            products_associated: deposit.productCount,
            associated: deposit.associatedDate,
            products: deposit.products || [],
            original: { ...deposit, products: deposit.products || [] },
          }));
          setDeposits(transformedDeposits);
          setError(null);
        } else {
          setError(response.error || "Error al cargar los depósitos");
        }
      } catch {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, [page, rowsPerPage, refetch]);

  useEffect(() => {
    const fetchAllDeposits = async () => {
      try {
        const response = await depositsAPI.getAllDeposits();
        if (response.success) {
          setAllDeposits(response.data);
        }
      } catch (e) {
        console.error("Error al cargar todos los depósitos:", e);
      }
    };

    fetchAllDeposits();
  }, []);

  const columns = [
    { id: "nombre", label: "Nombre", align: "left" },
    { id: "description", label: "Descripcion", align: "left" },
    { id: "location", label: "Ubicación", align: "left" },
    {
      id: "products_associated",
      label: "Productos Asociados",
      align: "center",
      format: (value) => `${value}`,
    },
    { id: "associated", label: "Asociado el", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleEdit = (deposit) => {
    setDepositoEditar(deposit.original || deposit);
    setOpenEditar(true);
  };

  const handleGuardarEdicion = async (depositoEditado) => {
    try {
      setLoading(true);
      const response = await depositsAPI.updateDeposit(depositoEditado.id, {
        name: depositoEditado.nombre,
        description: depositoEditado.descripcion,
        location: depositoEditado.ubicacion,
      });
      if (response.success) {
        const newResponse = await depositsAPI.getDeposits(page, rowsPerPage);
        if (newResponse.success) {
          const transformedDeposits = newResponse.data.map((deposit) => ({
            nombre: deposit.name,
            description: deposit.description,
            location: deposit.location,
            products_associated: deposit.productCount,
            associated: deposit.associatedDate,
            products: deposit.products || [],
            original: { ...deposit, products: deposit.products || [] },
          }));
          setDeposits(transformedDeposits);
          setOpenEditar(false);
        }
      } else {
        setError(response.error || "Error al actualizar el depósito");
      }
    } catch (e) {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

    const handleAddButtonClick = async (depositData) => {
      const response = await depositsAPI.createDeposit(depositData);
      if (!response.success) {
        setError(response.error);
      } else {
        setRefetch(prev => prev + 1);
      }
    };

  const handleDelete = (deposit) => {
    setSelectedDeposit(deposit);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await depositsAPI.deleteDeposit(selectedDeposit.original.id);
      if (response.success) {
        const newResponse = await depositsAPI.getDeposits(page, rowsPerPage);
        if (newResponse.success) {
          const transformedDeposits = newResponse.data.map((deposit) => ({
            nombre: deposit.name,
            description: deposit.description,
            location: deposit.location,
            products_associated: deposit.productCount,
            associated: deposit.associatedDate,
            original: deposit,
          }));
          setDeposits(transformedDeposits);
        }
      } else {
        setError(response.error || "Error al eliminar el depósito");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      handleCloseDelete();
    }
  };

  const handleView = (deposit) => {
    setDepositoSeleccionado(deposit.original || deposit);
    setOpenVer(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  return (
    <>
      <DataManagementPage
        title="Gestión de Depósitos"
        description="Administra el catálogo de depósitos del sistema"
        addButtonText="Agregar Depósito"
        addButtonIcon={<Warehouse />}
        tableTitle="Lista de Depósitos"
        columns={columns}
        data={deposits}
        defaultRowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        showViewAction={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        addDialog={<AgregarDeposito onAddButtonClick= {handleAddButtonClick}/>}
        loading={loading}
        error={error}
      />

      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar el depósito "${selectedDeposit?.nombre}"?`}
      />

      <DialogWatchDeposit
        open={openVer}
        onClose={() => setOpenVer(false)}
        deposito={depositoSeleccionado}
      />

      <DialogEditDeposit
        open={openEditar}
        onClose={() => setOpenEditar(false)}
        deposito={depositoEditar}
        onSave={handleGuardarEdicion}
      />
      
    </>
  );
}

