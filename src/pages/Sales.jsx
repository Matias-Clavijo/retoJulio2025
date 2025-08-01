import React, { useState, useEffect } from "react";
import { PointOfSale } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import SalesDashboard from "../components/SalesDashboard";
import AgregarVentaDialog from "../components/DialogVenta";
import { salesAPI } from "../services/api/stockBack";

export default function Sales() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    
    // Valores fijos para la paginación inicial
    const page = 1;
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchSales = async () => {
            try {
                setLoading(true);
                const response = await salesAPI.getSales(page, rowsPerPage);
                if (response.success) {
                    // Transformar los datos al formato esperado por la tabla
                    const transformedSales = response.data.map(sale => ({
                        producto: `Producto ${sale.product.id}`,
                        total: sale.price.value,
                        metodoPago: sale.paymentMethod,
                        fecha: new Date(sale.date).toLocaleDateString(),
                        revendedor: sale.reseller,
                        // Mantener los datos originales para edición/visualización
                        original: sale
                    }));
                    setSales(transformedSales);
                    setTotalIncome(response.total || 278912);
                    setError(null);
                } else {
                    setError(response.error || "Error al cargar las ventas");
                }
            } catch {
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [page, rowsPerPage]);

    const handleEdit = (sale) => {
        console.log("Editando venta:", sale);
    };

    const handleDelete = (sale) => {
        console.log("Eliminando venta:", sale);
    };

    const handleView = (sale) => {
        console.log("Viendo detalles de venta:", sale);
    };

    const columns = [
        { id: "producto", label: "Producto", align: "left" },
        { 
            id: "total", 
            label: "Total", 
            align: "right",
            format: (value) => `$${value.toLocaleString()}`
        },
        { id: "metodoPago", label: "Método de pago", align: "left" },
        { id: "fecha", label: "Fecha", align: "center" },
        { id: "revendedor", label: "Revendedor", align: "left" },
        { id: "acciones", label: "Acciones", align: "center" }
    ];





    return (
        <DataManagementPage
            title="Gestión de Ventas"
            description="Administra el catálogo de ventas del sistema"
            addButtonText="AGREGAR VENTA"
            addButtonIcon={<PointOfSale />}
            tableTitle="Lista de Ventas"
            columns={columns}
            data={sales}
            defaultRowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            showViewAction={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            addDialog={<AgregarVentaDialog />}
            loading={loading}
            error={error}
            extraInfoComponent={<SalesDashboard totalIncome={totalIncome} salesData={sales} />}
            backgroundColor="#EBEBEB"
        />
    );
} 