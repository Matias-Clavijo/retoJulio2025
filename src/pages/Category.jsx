import React, { useState, useEffect } from "react";
import { Category as CategoryIcon } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarCategoría from "../components/DialogCategoría.jsx";
import DialogEditCategory from "../components/DialogEditCategory.jsx"; // <-- Importa el nuevo diálogo
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
  const [refetch, setRefetch] = useState(0);
  

  // Estado para editar
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoriesAPI.getCategories(page, rowsPerPage);
        if (response.success) {
          const transformedCategories = response.data.map(category => ({
            name: category.name,
            description: "-", // No viene en el mock, pero mantenemos la estructura
            parent_category: "-", 
            products_count: category.productsCount,
            status: "Activo",
            created_at: new Date().toLocaleDateString(),
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
  }, [page, rowsPerPage, refetch]);

  const columns = [
    { id: "name", label: "Nombre", align: "left" },
    { id: "description", label: "Descripción", align: "left" },
    { id: "products_count", label: "Productos", align: "center" },
    { id: "status", label: "Estado", align: "center" },
    { id: "created_at", label: "Fecha de creación", align: "left" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  // Abrir diálogo de edición con categoría seleccionada
  const handleEdit = (category) => {
    setCategoryToEdit(category.original || category);
    setOpenEditDialog(true);
  };

  // Guardar cambios luego de editar
  const handleSaveEdit = async (editedCategory) => {
    try {
      setLoading(true);
      const response = await categoriesAPI.updateCategory(editedCategory.id, {
        name: editedCategory.name,
        description: editedCategory.description,
      });
      if (response.success) {
        const newResponse = await categoriesAPI.getCategories(page, rowsPerPage);
        if (newResponse.success) {
          const transformedCategories = newResponse.data.map(category => ({
            nombre: category.name,
            description: "-",
            parent_category: "-",
            products_count: category.productsCount,
            status: "Activo",
            created_at: new Date().toLocaleDateString(),
            original: category
          }));
          setCategories(transformedCategories);
          setOpenEditDialog(false);
        }
      } else {
        setError(response.error || "Error al actualizar la categoría");
      }
    } catch {
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleAddButtonClick = async (categoryData) => {
      const response = await categoriesAPI.createCategory(categoryData);
      if (!response.success) {
        setError(response.error);
      } else {
        setRefetch(prev => prev + 1);
      }
    };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      console.log("ID a eliminar:", selectedCategory?.original?.id); 
      const response = await categoriesAPI.deleteCategory(selectedCategory.original.id);
      if (response.success) {
        setRefetch(prev => prev + 1);
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
    setPage(1);
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
        addDialog={<AgregarCategoría onAddButtonClick={handleAddButtonClick}/>}
        loading={loading}
        error={error}
      />

      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar la categoría "${selectedCategory?.nombre}"?`}

      />

      <DialogEditCategory
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        category={categoryToEdit}
        onSave={handleSaveEdit}
      />
    </>
  );
}

