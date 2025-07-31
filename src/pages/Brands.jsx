import React, { useState, useEffect } from "react";
import { LocalOffer } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarMarca from "../components/DialogMarca.jsx";
import Eliminar from "../components/Eliminar";
import { brandsAPI } from "../services/api/stockBack";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [brandToEdit, setBrandToEdit] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await brandsAPI.getBrands();
        setBrands(response.data);
        if (response.success) {
          // Transformar los datos al formato esperado por la tabla
          const transformedBrands = response.data.map(brand => ({
            nombre: brand.name,
            description: brand.description,
            country: brand.country,
            products_associated: brand.associatedProductCount,
            created_at: new Date(brand.createdAt).toLocaleDateString(),
            // Mantener los datos originales para edición/visualización
            original: brand
          }));
          setBrands(transformedBrands);
          setError(null);
        } else {
          setError(response.error || "Error al cargar las marcas");
        }
      } catch (error) {
        console.error("Error al obtener marcas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const columns = [
    { id: "nombre", label: "Nombre", align: "left" },
    { id: "description", label: "Descripcion", align: "left" },
    { id: "country", label: "Pais de origen", align: "left" },
    {
      id: "products_associated",
      label: "Productos Asociados",
      align: "left",
      format: (value) => `${value}`,
    },
    { id: "created_at", label: "Fecha de creación", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleEdit = (brand) => {
    setBrandToEdit(brand);
    setOpenEditDialog(true);
  };

  const handleDelete = (brand) => {
    console.log("Deleting brand:", brand);
    setSelectedBrand(brand);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedBrand(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await brandsAPI.deleteBrand(selectedBrand.original.id);
      if (response.success) {
        // Recargar la lista después de eliminar
        const newResponse = await brandsAPI.getBrands(page, rowsPerPage);
        if (newResponse.success) {
          const transformedBrands = newResponse.data.map(brand => ({
            nombre: brand.name,
            description: brand.description,
            country: brand.country,
            products_associated: brand.associatedProductCount,
            created_at: new Date(brand.createdAt).toLocaleDateString(),
            original: brand
          }));
          setBrands(transformedBrands);
        }
      } else {
        setError(response.error || "Error al eliminar la marca");
      }
    } catch {
      setError("Error al conectar con el servidor");
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
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleCloseEditDialog = () => {
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
      addDialog={<AgregarMarca />}
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
    onClose={handleCloseEditDialog}
    brandToEdit={brandToEdit}
    />

    <CommonTable
      data={brands}
      columns={columns}
      onEdit={handleEdit}       // si tenés edición
      onDelete={handleConfirmDelete}   // si tenés borrado
    />

    </>
  );
}
