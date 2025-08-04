import React, { useState, useEffect } from "react";
import { LocalShipping } from "@mui/icons-material";
import { Box } from "@mui/material";
import DataManagementPage from "../components/DataManagementPage";
import DialogStockMovement from "../components/DialogStockMovement.jsx";
import { stockMovementsAPI } from "../services/api/stockBack";
import DialogWatchMovements from "../components/DialogWatchMovements.jsx";
import DialogEditMovement from "../components/DialogEditMovement.jsx";
import Eliminar from "../components/Eliminar";

export default function StockMovements() {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openVer, setOpenVer] = useState(false);
    const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);
    const [openEditar, setOpenEditar] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [movimientoAEliminar, setMovimientoAEliminar] = useState(null);
    const [refetch, setRefetch] = useState(1);
    const [stockMovementToEdit, setStockMovementToEdit] = useState(null);

    // Function to fetch movements from API
    const fetchMovements = async () => {
        try {
            setLoading(true);
            const response = await stockMovementsAPI.getStockMovements();
            if (response.success) {
                console.log(response);
                const transformedMovements = response.data.map(movement => {
                    // Handle deposit display logic
                    let depositoDisplay = '';
                    const originalDeposit = movement?.originalDeposit?.name;
                    const destinationDeposit = movement?.destinationDeposit?.name;
                    
                    if (originalDeposit && destinationDeposit && originalDeposit !== destinationDeposit) {
                        depositoDisplay = `${originalDeposit} → ${destinationDeposit}`;
                    } else if (originalDeposit) {
                        depositoDisplay = originalDeposit;
                    } else if (destinationDeposit) {
                        depositoDisplay = destinationDeposit;
                    } else {
                        depositoDisplay = 'No especificado';
                    }

                    return {
                        id: movement.id,
                        producto: movement?.product?.name,
                        deposito: depositoDisplay,
                        tipo: movement?.type,
                        cantidad: movement?.quantity,
                        asociado: new Date(movement?.createdAt).toLocaleDateString(),
                        // Keep original data for editing/viewing
                        original: movement
                    };
                });
                setMovements(transformedMovements);
                setError(null);
            } else {
                setError(response.error || "Error al cargar los movimientos de stock");
            }
        } catch (error) {
            console.error("Error fetching movements:", error);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovements();
    }, [page, rowsPerPage, refetch]);

    const columns = [
        { id: "producto", label: "Producto", align: "left" },
        { 
            id: "deposito", 
            label: "Depósito", 
            align: "left", 
            format: (value, row) => {
                const original = row?.original;
                const originDeposit = original?.originDeposit?.name;
                const destinationDeposit = original?.destinationDeposit?.name;
                
                console.log(originDeposit, destinationDeposit);
                if (originDeposit && destinationDeposit && originDeposit !== destinationDeposit) {
                    return `${originDeposit} → ${destinationDeposit}`;
                } else if (originDeposit) {
                    return originDeposit;
                } else if (destinationDeposit) {
                    return destinationDeposit;
                } else {
                    return value || 'No especificado';
                }
            }
        },
        { 
            id: "tipo", 
            label: "Tipo", 
            align: "center",
            format: (value) => (
                <Box
                    sx={{
                        backgroundColor: value === "ENTRY" ? '#e8f5e9' : value === "TRANSFER" ? '#e3f2fd' : '#ffebee',
                        color: value === "ENTRY" ? '#2e7d32' : value === "TRANSFER" ? '#1565c0' : '#c62828',
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.5,
                        display: 'inline-block',
                        fontSize: '0.875rem',
                        fontWeight: 'medium'
                    }}
                >
                    {value === "ENTRY" ? "Entrada" : value === "TRANSFER" ? "Transferencia" : "Salida"}
                </Box>
            )
        },
        { 
            id: "cantidad", 
            label: "Cantidad de productos", 
            align: "center",
            format: (value) => value.toLocaleString()
        },
        { id: "asociado", label: "Fecha", align: "center" },
        { id: "acciones", label: "Acciones", align: "center" },
    ];

    const handleEdit = (movement) => {
        setMovimientoSeleccionado(movement.original);
        setOpenEditar(true);
    };

      const handleSaveEdit = async (updatedSTockMovement) => {
        try {
          setLoading(true);
          console.log(updatedSTockMovement);
          const response = await stockMovementsAPI.updateStockMovement(stockMovementToEdit.id, {
            type: updatedSTockMovement.type,
            product: updatedSTockMovement.productId, 
            deposit: updatedSTockMovement.depositId,
            reference: updatedSTockMovement.referenceDepositId,
            quantity: updatedSTockMovement.quantity
          });
          if (response.success) {
            setRefetch(prev => prev + 1);
            setOpenEditDialog(false);
            setStockMovementToEdit(null);
            setError(null);
            showSuccess("Movimiento editado exitosamente");
          } else {
            setError(response.error || "Error al actualizar el movimiento");
            showError("Error al actualizar el movimiento");
          }
        } catch {
          setError("Error al conectar con el servidor");
          showError("Error al conectar con el servidor");
        } finally {
          setLoading(false);
        }
      };

    const handleDelete = (movement) => {
        setMovimientoAEliminar(movement.original || movement);
        setOpenEliminar(true);
    };

    const handleConfirmEliminar = async () => {
        if (!movimientoAEliminar) return;

        try {
            setLoading(true);
            const response = await stockMovementsAPI.deleteStockMovement(movimientoAEliminar.id);
            
            if (response?.success) {
                setError(null);
                setRefetch(refetch + 1); // Trigger refetch
            } else {
                setError(response.error || "Error al eliminar el movimiento");
            }
        } catch (error) {
            console.error("Error deleting movement:", error);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
            setOpenEliminar(false);
            setMovimientoAEliminar(null);
        }
    };

    const handleView = (movement) => {
        setMovimientoSeleccionado(movement.original || movement);
        setOpenVer(true);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1); // Reset to first page when changing rows per page
    };

    const handleSubmitMovement = async (movimientoData) => {
        try {
            setLoading(true);
            let response;

            if (movimientoData.id) {
                // Update existing movement
                response = await stockMovementsAPI.updateStockMovement(movimientoData.id, movimientoData);
            } else {
                // Create new movement
                response = await stockMovementsAPI.createStockMovement(movimientoData);
            }

            if (response?.success) {
                setError(null);
                setRefetch(refetch + 1); // Trigger refetch
            } else {
                setError(response.error || "Error al guardar el movimiento");
            }
        } catch (error) {
            console.error("Error saving movement:", error);
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
            setOpenEditar(false);
            setMovimientoSeleccionado(null);
        }
    };

    return (
        <>
        <DataManagementPage
            title="Movimiento de Stock"
            description="Administra la cantidad de productos en los depósitos del sistema"
            addButtonText="NUEVO STOCK"
            addButtonIcon={<LocalShipping />}
            tableTitle="Lista de Movimientos"
            columns={columns}
            data={movements}
            defaultRowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            showViewAction={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            addDialog={<DialogStockMovement onSave={handleSubmitMovement} />}
            loading={loading}
        />
        
        <DialogWatchMovements
            open={openVer}
            onClose={() => setOpenVer(false)}
            movimiento={movimientoSeleccionado}
        />
        
        <DialogStockMovement
            onClose={() => setOpenEditar(false)}
            onSave={handleSubmitMovement}
            open={openEditar}
            movement={movimientoSeleccionado}
        />

        <Eliminar
            open={openEliminar}
            onClose={() => setOpenEliminar(false)}
            onConfirm={handleConfirmEliminar}
            title={`¿Estás seguro que deseas eliminar este movimiento de stock?`}
        />
        </>
    );
} 