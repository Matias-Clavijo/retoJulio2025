import React, { useState, useEffect } from "react";
import { LocalShipping } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import DialogStock from "../components/DialogStock";
import { stockMovementsAPI } from "../services/api/stockBack";

export default function StockMovements() {
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchMovements = async () => {
            try {
                setLoading(true);
                const response = await stockMovementsAPI.getStockMovements(page, rowsPerPage);
                if (response.success) {
                    // Transformar los datos al formato esperado por la tabla
                    const transformedMovements = response.data.map(movement => ({
                        producto: movement.product.name,
                        deposito: movement.deposit.name,
                        tipo: movement.type,
                        cantidad: movement.quantity,
                        asociado: new Date(movement.date).toLocaleDateString(),
                        // Mantener los datos originales para edición/visualización
                        original: movement
                    }));
                    setMovements(transformedMovements);
                    setError(null);
                } else {
                    setError(response.error || "Error al cargar los movimientos de stock");
                }
            } catch (_err) {
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchMovements();
    }, [page, rowsPerPage]);

    const columns = [
        { id: "producto", label: "Producto", align: "left" },
        { id: "deposito", label: "Depósito", align: "left" },
        { 
            id: "tipo", 
            label: "Tipo", 
            align: "left",
            format: (value) => value === "IN" ? "Entrada" : "Salida"
        },
        { 
            id: "cantidad", 
            label: "Cantidad de productos", 
            align: "center",
            format: (value) => value.toLocaleString()
        },
        { id: "asociado", label: "Asociado", align: "center" },
        { id: "acciones", label: "Acciones", align: "center" },
    ];

    const handleEdit = (movement) => {
        console.log("Editing movement:", movement.original || movement);
    };

    const handleDelete = (movement) => {
        console.log("Deleting movement:", movement.original || movement);
    };

    const handleView = (movement) => {
        console.log("Viewing movement:", movement.original || movement);
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
            title="Movimiento de Stock"
            description="Administra la cantidad de productos en los depósitos del sistema"
            addButtonText="NUEVO STOCK"
            addButtonIcon={<LocalShipping />}
            tableTitle="Lista de Movimientos"
            columns={columns}
            data={movements}
            defaultRowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            showViewAction={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            addDialog={<DialogStock />}
            loading={loading}
            error={error}
        />
    );
} 