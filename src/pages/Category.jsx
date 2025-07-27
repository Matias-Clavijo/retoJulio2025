import React, { useState, useEffect } from "react";
import { Category as CategoryIcon } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarCategoría from "../components/AgregarCategoría";
import { categoriesAPI } from "../services/api/stockBack";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      } catch (_err) {
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
    { id: "parent_category", label: "Categoría Padre", align: "left" },
    { id: "products_count", label: "Productos", align: "center" },
    { id: "status", label: "Estado", align: "center" },
    { id: "created_at", label: "Fecha de creación", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleEdit = (category) => {
    console.log("Editing category:", category.original || category);
  };

  const handleDelete = (category) => {
    console.log("Deleting category:", category.original || category);
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
    <DataManagementPage
      title="Gestión de Categorías"
      description="Organiza y administra las categorías de productos"
      addButtonText="Agregar Categoría"
      addButtonIcon={<CategoryIcon />}
      tableTitle="Lista de categorías"
      columns={columns}
      data={categories}
      defaultRowsPerPage={rowsPerPage}
      showViewAction={true}
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
  );
}
