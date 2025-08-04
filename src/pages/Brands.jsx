import React, { useState, useEffect } from "react";
import { LocalOffer } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarMarca from "../components/DialogMarca.jsx";
import Eliminar from "../components/Eliminar";
import DialogEditBrand from "../components/DialogEditBrand.jsx";  // <-- Importa el nuevo componente
import { brandsAPI } from "../services/api/stockBack";
import { useNotification } from "../hooks/useNotification";

export default function Brands() {
  const { showError, showSuccess } = useNotification();
  
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        if (refetch === 0) {
          setLoading(true);
        }
        const response = await brandsAPI.getBrands(page, rowsPerPage);
        if (response.success) {
          const transformedBrands = response.data.map(brand => ({
            nombre: brand.name,
            description: brand.description,
            country: brand.country,
            products_associated: brand.associatedProductCount,
            created_at: new Date(brand.createdAt).toLocaleDateString(),
            original: brand
          }));
          setBrands(transformedBrands);
          setError(null);
        } else {
          setError(response.error || "Error al cargar las marcas");
        }
      } catch {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [page, rowsPerPage, refetch]);

  const columns = [
    { id: "nombre", label: "Nombre", align: "left" },
    { id: "description", label: "Descripcion", align: "left" },
    { id: "country", label: "Pais de origen", align: "left", format: (value) => `📍 ${value || "N/A"}` },
    {
      id: "products_associated",
      label: "Productos Asociados",
      align: "left",
      format: (value) => `${value}`,
    },
    { id: "created_at", label: "Fecha de creación", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleAddButtonClick = async (brandData) => {
    try {
      const response = await brandsAPI.createBrand(brandData);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Marca agregada exitosamente");
      } else {
        setError(response.error);
        showError("Error al agregar la marca");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    }
  };

  const handleEdit = (brand) => {
    setBrandToEdit(brand.original || brand);
    setOpenEditDialog(true);
  };

  const handleDelete = (brand) => {
    setSelectedBrand(brand);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await brandsAPI.deleteBrand(selectedBrand.original.id);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Marca eliminada exitosamente");
      } else {
        setError(response.error || "Error al eliminar la marca");
        showError("Error al eliminar la marca");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      handleCloseDelete();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  // Maneja guardar cambios después de editar
  const handleSaveEdit = async (updatedBrand) => {
    try {
      setLoading(true);
      console.log(updatedBrand);
      const response = await brandsAPI.updateBrand(brandToEdit.id, {
        name: updatedBrand.nombre,
        description: updatedBrand.descripcion,
        country: updatedBrand.pais,
      });
      if (response.success) {
        setRefetch(prev => prev + 1);
        setOpenEditDialog(false);
        setBrandToEdit(null);
        setError(null);
        showSuccess("Marca editada exitosamente");
      } else {
        setError(response.error || "Error al actualizar la marca");
        showError("Error al actualizar la marca");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setBrandToEdit(null);
  };

  return (
    <>
      <DataManagementPage
        title="Gestión de Marcas"
        description="Administra las marcas de los productos"
        addButtonText="Agregar Marca"
        addButtonIcon={<LocalOffer />}
        tableTitle="Lista de marcas"
        columns={columns}
        data={brands}
        defaultRowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        addDialog={<AgregarMarca buttonText="Agregar marca" title="Agregar marca" onAddButtonClick={handleAddButtonClick} />}
        loading={loading}
        error={error}
      />
      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar la marca "${selectedBrand?.nombre}"?`}
      />
      <AgregarMarca
        open={openEditDialog}
        buttonText={'Guardar cambios'}
        title={'Editar marca'}
        onClose={handleCloseEdit}
        brand={brandToEdit}
        onAddButtonClick={handleSaveEdit}
      />
    </>
  );
}

