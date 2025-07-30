import React, { useState, useEffect } from "react";
import { Category as CategoryIcon } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarCategoría from "../components/DialogCategoría.jsx";
import Eliminar from "../components/Eliminar";
import { categoriesAPI } from "../services/api/stockBack";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getCategories(page, rowsPerPage);
        if (response.success) {
          // Transformar los datos al formato esperado por la tabla
          const transformedCategories = response.data.map(category => ({
            name: category.name,
            description: "-", // No viene en el mock, pero mantenemos la estructura
            parent_category: "-", // No viene en el mock, pero mantenemos la estructura
            products_count: category.productsCount,
            status: "Activo", // Valor por defecto
            created_at: new Date().toLocaleDateString(), // Usamos fecha actual como ejemplo
            // Mantener los datos originales para edición/visualización
            original: category
          }));
          setCategories(transformedCategories);
          setError(null);
        } else {
          setError(response.error || "Error al cargar las categorías");
        }
      } catch {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, rowsPerPage]);

  const columns = [
    { id: "name", label: "Nombre", align: "left" },
    { id: "description", label: "Descripción", align: "left" },
    { id: "products_count", label: "Productos", align: "center" },
    { id: "status", label: "Estado", align: "center" },
    { id: "created_at", label: "Fecha de creación", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleEdit = (category) => {
    console.log("Editing category:", category.original || category);
  };

  const handleDelete = (category) => {
    console.log("Deleting category:", category);
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await categoriesAPI.deleteCategory(selectedCategory.original.id);
      if (response.success) {
        // Recargar la lista después de eliminar
        const newResponse = await categoriesAPI.getCategories(page, rowsPerPage);
        if (newResponse.sucstrategiescess) {
          const transformedCategories = newResponse.data.map(category => ({
            name: category.name,
            description: "-",
            parent_category: "-",
            products_count: category.productsCount,
            status: "Activo",
            created_at: new Date().toLocaleDateString(),
            original: category
          }));
          setCategories(transformedCategories);
        }
      } else {
        setError(response.error || "Error al eliminar la categoría");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
      handleCloseDelete();
    }
  };

  const handleView = (category) => {
    console.log("Viewing category:", category.original || category);
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
        title="Gestión de Categorías"
        description="Organiza y administra las categorías de productos"
        addButtonText="Agregar Categoría"
        addButtonIcon={<CategoryIcon />}
        tableTitle="Lista de categorías"
        columns={columns}
        data={categories}
        defaultRowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        addDialog={<AgregarCategoría />}
        loading={loading}
        error={error}
      />
      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar la categoría "${selectedCategory?.name}"?`}
      />
    </>
  );
}
