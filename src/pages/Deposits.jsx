import React, { useState, useEffect } from "react";
import { Warehouse } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import EditarDeposito from "../components/editarDeposito";
import { depositsAPI } from "../services/api/stockBack";
import Eliminar from "../components/Eliminar";

export default function Deposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        setLoading(true);
        const response = await depositsAPI.getDeposits(page, rowsPerPage);
        if (response.success) {
          // Transformar los datos al formato esperado por la tabla
          const transformedDeposits = response.data.map(deposit => ({
            nombre: deposit.name,
            description: deposit.description,
            location: deposit.location,
            products_associated: deposit.productCount,
            associated: deposit.associatedDate,
            // Mantener los datos originales para edición/visualización
            original: deposit
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
  }, [page, rowsPerPage]);

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
    console.log("Editing deposit:", deposit.original || deposit);
  };

  const handleDelete = (deposit) => {
    console.log("Deleting deposit:",deposit);
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
        // Recargar la lista después de eliminar
        const newResponse = await depositsAPI.getDeposits(page, rowsPerPage);
        if (newResponse.success) {
          const transformedDeposits = newResponse.data.map(deposit => ({
            nombre: deposit.name,
            description: deposit.description,
            location: deposit.location,
            products_associated: deposit.productCount,
            associated: deposit.associatedDate,
            original: deposit
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
    console.log("Viewing deposit:", deposit.original || deposit);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page when changing rows per page
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
      addDialog={<EditarDeposito />}
      loading={loading}
      error={error}
    />
        <Eliminar
          open={openDeleteDialog}
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
          title={`¿Estás seguro que deseas eliminar el depósito "${selectedDeposit?.nombre}"?`}
        />
    </>
  );
}
