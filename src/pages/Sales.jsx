import React, { useState, useEffect } from "react";
import { PointOfSale } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import SalesDashboard from "../components/SalesDashboard";
import AgregarVentaDialog from "../components/DialogVenta";
import Eliminar from "../components/Eliminar";
import { salesAPI } from "../services/api/stockBack";

export default function Sales() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [refetch, setRefetch] = useState(0);
    
    // Estados para editar venta
    const [openEditar, setOpenEditar] = useState(false);
    const [ventaEditar, setVentaEditar] = useState(null);
    
    // Estados para eliminar venta
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    
    const page = 1;
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchSales = async () => {
            try {
                if (refetch === 0) {
                    setLoading(true);
                }
                const response = await salesAPI.getSales(page, rowsPerPage);
                if (response.success) {
                    const transformedSales = response.data.map(sale => ({
                        producto: `${sale.product.id}`,
                        metodoPago: sale.paymentMethod,
                        fecha: new Date(sale.date).toLocaleDateString(),
                        revendedor: sale.reseller,

                        original: sale
                    }));
                    setSales(transformedSales);
                    setTotalIncome(response.total || 278912);
                    setError(null);
                } else {
                    setError(response.error || "Error al cargar las ventas");
                }
            } catch (error) {
                console.log(error);
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [page, rowsPerPage, refetch]);

    const handleEdit = (sale) => {
        setVentaEditar(sale.original || sale);
        setOpenEditar(true);
    };

    const handleDelete = (sale) => {
        setSelectedSale(sale);
        setOpenDeleteDialog(true);
    };

    const handleView = (sale) => {
        console.log("Viendo detalles de venta:", sale);
    };

    const handleGuardarEdicion = async (ventaEditada) => {
        try {
            setLoading(true);
            const response = await salesAPI.updateSale(ventaEditada.id, {
                date: ventaEditada.date,
                paymentMethod: ventaEditada.paymentMethod,
                reseller: ventaEditada.reseller,
                price: ventaEditada.price
            });
            if (response.success) {
                setRefetch(prev => prev + 1);
                setOpenEditar(false);
                setVentaEditar(null);
            } else {
                setError(response.error || "Error al actualizar la venta");
            }
        } catch {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
        setSelectedSale(null);
    };

    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response = await salesAPI.deleteSale(selectedSale.original.id);
            if (response.success) {
                setRefetch(prev => prev + 1);
            } else {
                setError(response.error || "Error al eliminar la venta");
            }
        } catch {
            setError("Error al conectar con el servidor");
        } finally {
            setLoading(false);
            handleCloseDelete();
        }
    };

    const handleAddButtonClick = async (saleData) => {
        const response = await salesAPI.createSale(saleData);
        if (!response.success) {
            setError(response.error);
        } else {
            setRefetch(prev => prev + 1);
        }
    };

    const columns = [
        { id: "producto", label: "Producto", align: "left" },
        { id: "metodoPago", label: "Método de pago", align: "left" },
        { id: "fecha", label: "Fecha", align: "center" },
        { id: "revendedor", label: "Revendedor", align: "left" },
        { id: "acciones", label: "Acciones", align: "center" }
    ];

    return (
        <>
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
                addDialog={<AgregarVentaDialog onAddButtonClick={handleAddButtonClick} />}
                loading={loading}
                error={error}
                extraInfoComponent={<SalesDashboard totalIncome={totalIncome} salesData={sales} />}
                backgroundColor="#EBEBEB"
            />

            <Eliminar
                open={openDeleteDialog}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                title={`¿Estás seguro que deseas eliminar la venta del producto "${selectedSale?.producto}"?`}
            />

            <AgregarVentaDialog
                open={openEditar}
                onClose={() => setOpenEditar(false)}
                sale={ventaEditar}
                onSave={handleGuardarEdicion}
                products={sales?.map(sale => sale.original)}
            />
        </>
    );
} 