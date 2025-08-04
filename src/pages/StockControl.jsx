import React, { useState, useEffect } from "react";
import { Inventory2 } from "@mui/icons-material";
import { Chip } from "@mui/material";
import DataManagementPage from "../components/DataManagementPage";
import { stockAPI } from "../services/api/stockBack";
import Eliminar from "../components/Eliminar";
import DialogAddStock from "../components/DialogAddStock";
import { useNotification } from "../hooks/useNotification";

export default function StockControl() {
  const { showError, showSuccess } = useNotification();
  
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [refetch, setRefetch] = useState(0);

  // Estados para agregar/editar stock
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [stockToEdit, setStockToEdit] = useState(null);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        setLoading(true);
        const response = await stockAPI.getStock(page, rowsPerPage);
        if (response.success) {
          const transformedStock = response.data.map((stockItem) => ({
            id: stockItem.id,
            producto: stockItem.product?.name || 'N/A',
            marca: stockItem.product?.brand?.name || 'N/A',
            categoria: stockItem.product?.category?.name || 'N/A',
            deposito: stockItem.deposit?.name || 'N/A',
            ubicacion: stockItem.deposit?.location || 'N/A',
            cantidad: stockItem.quantity,
            original: stockItem
          }));
          setStock(transformedStock);
        } else {
          console.error("Error al cargar el stock:", response.error);
          showError("Error al cargar el stock");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        showError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [page, rowsPerPage, refetch]);

  // Función para obtener el chip de cantidad con colores
  const getQuantityChip = (quantity) => {
    let color = 'default';
    let icon = '📦';
    
    if (quantity === 0) {
      color = 'error';
      icon = '❌';
    } else if (quantity < 10) {
      color = 'warning';
      icon = '⚠️';
    } else if (quantity >= 50) {
      color = 'success';
      icon = '✅';
    } else {
      color = 'primary';
      icon = '📦';
    }

    return (
      <Chip
        label={`${icon} ${quantity}`}
        color={color}
        variant="outlined"
        size="small"
        sx={{ 
          fontWeight: 'medium',
          minWidth: '80px'
        }}
      />
    );
  };

  const columns = [
    { id: "producto", label: "Producto", align: "left" },
    { id: "marca", label: "Marca", align: "left" },
    { id: "categoria", label: "Categoría", align: "left" },
    { id: "deposito", label: "Depósito", align: "left" },
    { id: "ubicacion", label: "Ubicación", align: "left", format: (value) => `📍 ${value}` },
    { 
      id: "cantidad", 
      label: "Cantidad", 
      align: "center",
      format: (quantity) => getQuantityChip(quantity)
    },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const handleEdit = (stockItem) => {
    setStockToEdit(stockItem);
    setOpenStockDialog(true);
  };

  const handleAddButtonClick = () => {
    setStockToEdit(null);
    setOpenStockDialog(true);
  };

  const handleSaveStock = async (...args) => {
    try {
      setLoading(true);
      let response;
      
      if (args.length === 2) {
        // Modo edición: primer argumento es ID, segundo es data
        const [stockId, stockData] = args;
        response = await stockAPI.updateStock(stockId, stockData);
        if (response.success) {
          setRefetch(prev => prev + 1);
          showSuccess("Stock actualizado exitosamente");
        } else {
          showError("Error al actualizar el stock");
        }
      } else {
        // Modo creación: solo un argumento con data
        const [stockData] = args;
        response = await stockAPI.createStock(stockData);
        if (response.success) {
          setRefetch(prev => prev + 1);
          showSuccess("Stock agregado exitosamente");
        } else {
          showError("Error al agregar el stock");
        }
      }
    } catch (error) {
      console.error("Error saving stock:", error);
      showError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (stockItem) => {
    setSelectedStock(stockItem);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedStock(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await stockAPI.deleteStock(selectedStock.original?.id || selectedStock.id);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Stock eliminado exitosamente");
      } else {
        showError("Error al eliminar el stock");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
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

  return (
    <>
      <DataManagementPage
        title="Control de Stock"
        description="Administra las cantidades de productos en cada depósito"
        addButtonText="Agregar Stock"
        addButtonIcon={<Inventory2 />}
        tableTitle="Lista de Stock"
        columns={columns}
        data={stock}
        defaultRowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onAddButtonClick={handleAddButtonClick}
        addDialog={<DialogAddStock />}
        loading={loading}
      />

      {/* Diálogo para agregar/editar stock */}
      <DialogAddStock
        open={openStockDialog}
        onClose={() => {
          setOpenStockDialog(false);
          setStockToEdit(null);
        }}
        onAddButtonClick={handleSaveStock}
        stock={stockToEdit}
      />

      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar el stock del producto "${selectedStock?.producto}" en "${selectedStock?.deposito}"?`}
      />
    </>
  );
} 