import React, { useState, useEffect } from "react";
import { Category as CategoryIcon, Visibility, Edit, Delete } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarCategoriaDialog from "../components/DialogCategoría";
import DialogEditCategory from "../components/DialogEditCategory";
import Eliminar from "../components/Eliminar";
import { categoriesAPI } from "../services/api/stockBack";
import { useNotification } from "../hooks/useNotification";

export default function CategoryPage() {
  const { showError, showSuccess } = useNotification();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Estados para edición
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const [refetch, setRefetch] = useState(0);
  

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
            products_count: category.associatedProductCount,
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
            name: category.name,
            description: "-",
            parent_category: "-",
            products_count: category.productsCount,
            status: "Activo",
            created_at: new Date().toLocaleDateString(),
            original: category
          }));
          setCategories(transformedCategories);
          setOpenEditDialog(false);
          showSuccess("Categoría editada exitosamente");
        }
      } else {
        setError(response.error || "Error al actualizar la categoría");
        showError("Error al actualizar la categoría");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleAddButtonClick = async (categoryData) => {
    try {
      const response = await categoriesAPI.createCategory(categoryData);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Categoría agregada exitosamente");
      } else {
        setError(response.error);
        showError("Error al agregar la categoría");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
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
    const response = await categoriesAPI.deleteCategory(selectedCategory.original.id);
    if (response.success) {
      setRefetch(prev => prev + 1);
      showSuccess("Categoría eliminada exitosamente");
    } else {
      setError(response.error || "Error al eliminar la categoría");
      showError("Error al eliminar la categoría");
    }
  } catch (error) {
    console.error("ERROR COMPLETO:", error);
    if (error.response) {
      console.error("DATA:", error.response.data);
      console.error("STATUS:", error.response.status);
      console.error("HEADERS:", error.response.headers);
    }
    setError("Error al conectar con el servidor");
    showError("Error al conectar con el servidor");
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
        addDialog={<AgregarCategoriaDialog onAddButtonClick={handleAddButtonClick}/>}
        loading={loading}
      />

      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar la categoría "${selectedCategory?.name}"?`}

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

