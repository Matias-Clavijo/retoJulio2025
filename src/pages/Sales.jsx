import React, { useState, useEffect } from "react";
import { PointOfSale } from "@mui/icons-material";
import { Chip } from "@mui/material";
import DataManagementPage from "../components/DataManagementPage";
import SalesDashboard from "../components/SalesDashboard";
import AgregarVentaDialog from "../components/DialogVenta";
import DialogWatchSales from "../components/DialogWatchSales";
import Eliminar from "../components/Eliminar";
import { salesAPI } from "../services/api/stockBack";
import { useListFormatter } from "../hooks/useListFormatter";
import { useNotification } from "../hooks/useNotification";

export default function Sales() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(0);
    
    // Estados para editar venta
    const [openEditar, setOpenEditar] = useState(false);
    const [ventaEditar, setVentaEditar] = useState(null);
    
    // Estados para eliminar venta
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);

    // Estados para ver detalles de venta
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [saleToView, setSaleToView] = useState(null);

    const { formatList } = useListFormatter();
    const { showError, showSuccess } = useNotification();
    
    const page = 1;
    const rowsPerPage = 10;

    // Función para obtener color del método de pago
    const getPaymentMethodChip = (method) => {
        const paymentConfig = {
            'CARD': { 
                label: 'Tarjeta', 
                color: 'primary',
                icon: '💳'
            },
            'TRANSFER': { 
                label: 'Transferencia', 
                color: 'secondary',
                icon: '🏦'
            },
            'CASH': { 
                label: 'Efectivo', 
                color: 'success',
                icon: '💵'
            }
        };

        const config = paymentConfig[method] || { 
            label: method || 'N/A', 
            color: 'default',
            icon: '❓'
        };

        return (
            <Chip
                label={`${config.icon} ${config.label}`}
                color={config.color}
                variant="outlined"
                size="small"
                sx={{ 
                    fontWeight: 'medium',
                    minWidth: '120px'
                }}
            />
        );
    };

    // Function to fetch sales from API
    const fetchSales = async () => {
        try {
            if (refetch === 0) {
                setLoading(true);
            }
            const response = await salesAPI.getSales(page, rowsPerPage);
            if (response.success) {
                const transformedSales = response.data.map(sale => ({
                    id: sale.id,
                    producto: sale.product, // Handle both single and multiple products
                    metodoPago: sale.paymentMethod,
                    fecha: new Date(sale.date).toLocaleDateString(),
                    revendedor: sale.reseller,
                    precio: sale.price ? `$${sale.price.toLocaleString()} ${sale.currency || 'USD'}` : 'N/A',
                    original: sale
                }));
                setSales(transformedSales);
            } else {
                console.error("Error al cargar las ventas:", response.error);
            }
        } catch (error) {
            console.error("Error fetching sales:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
        setSaleToView(sale);
        setOpenViewDialog(true);
    };

    const handleCloseViewDialog = () => {
        setOpenViewDialog(false);
        setSaleToView(null);
    };

    const handleGuardarEdicion = async (ventaEditada) => {
        try {
            setLoading(true);
            
            // Transform the data to match the new API format
            const saleUpdateData = {
                fecha: ventaEditada.fecha || ventaEditada.date,
                metodoPago: ventaEditada.metodoPago || ventaEditada.paymentMethod,
                revendedor: ventaEditada.revendedor || ventaEditada.reseller,
                product: ventaEditada.product
            };

            const response = await salesAPI.updateSale(ventaEditada.id, saleUpdateData);
            
            if (response.success) {
                setRefetch(prev => prev + 1);
                setOpenEditar(false);
                setVentaEditar(null);
                showSuccess("Venta actualizada exitosamente");
            } else {
                showError("Error al actualizar la venta");
            }
        } catch (error) {
            console.error("Error updating sale:", error);
            showError("Error al actualizar la venta");
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
            const response = await salesAPI.deleteSale(selectedSale.original?.id || selectedSale.id);
            if (response.success) {
                setRefetch(prev => prev + 1);
                showSuccess("Venta eliminada exitosamente");
            } else {
                showError("Error al eliminar la venta");
            }
        } catch (error) {
            console.error("Error deleting sale:", error);
            showError("Error al eliminar la venta");
        } finally {
            setLoading(false);
            handleCloseDelete();
        }
    };

    const handleAddButtonClick = async (saleData) => {
        try {
            setLoading(true);
            const response = await salesAPI.createSale(saleData);
            if (response.success) {
                setRefetch(prev => prev + 1);
                showSuccess("Venta creada exitosamente");
            } else {
                showError("Error al crear la venta");
            }
        } catch (error) {
            console.error("Error creating sale:", error);
            showError("Error al crear la venta");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { id: "producto", label: "Producto", align: "left", 
            format: (products) => {
                console.log(products);
                // Handle array of products (new format)
                if (Array.isArray(products) && products.length > 0) {
                    const productNames = products.map(product => product.name);
                    console.log(productNames);
                    return formatList(productNames, {
                      maxVisible: 2,
                      showChips: true,
                      chipColor: 'primary',
                      listTitle: 'Ver todos los productos'
                    });
                }
                return '-';
              }
         },
        { id: "metodoPago", label: "Método de pago", align: "left",
            format: (method) => getPaymentMethodChip(method)
        },
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
                extraInfoComponent={<SalesDashboard salesData={sales} />}
                backgroundColor="#EBEBEB"
            />

            {/* Dialog para ver detalles */}
            <DialogWatchSales
                open={openViewDialog}
                onClose={handleCloseViewDialog}
                sale={saleToView}
            />

            <Eliminar
                open={openDeleteDialog}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                title={`¿Estás seguro que deseas eliminar la venta del producto "${selectedSale?.producto}"?`}
            />

            <AgregarVentaDialog
                open={openEditar}
                onClose={() => {
                    setOpenEditar(false);
                    setVentaEditar(null);
                }}
                sale={ventaEditar}
                onAddButtonClick={handleGuardarEdicion}
                products={sales?.map(sale => sale.original)}
            />
        </>
    );
} 