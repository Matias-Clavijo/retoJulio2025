import React, { useState, useEffect } from "react";
import { PointOfSale } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, CircularProgress, Alert, IconButton } from "@mui/material";
import DataManagementPage from "../components/DataManagementPage";
import SalesDashboard from "../components/SalesDashboard";
import AgregarVentaDialog from "../components/DialogVenta";
import CommonTable from "../components/common/CommonTable";
import TitleHeader from "../components/common/TitelHeader";
import Button from "@mui/material/Button";
import Sidebar from "../components/Sidebar";
import { salesAPI } from "../services/api/stockBack";

export default function Sales() {
    const [sales, setSales] = useState([]);
        const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    
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
        { 
            id: "acciones", 
            label: "Acciones", 
            align: "center",
            format: (_, row) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton 
                        size="small" 
                        onClick={() => handleEdit(row)}
                        sx={{ color: 'primary.main' }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                        size="small" 
                        onClick={() => handleDelete(row)}
                        sx={{ color: 'error.main' }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                        size="small" 
                        onClick={() => handleView(row)}
                        sx={{ color: 'info.main' }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Box>
            )
        }
    ];





    const handleAdd = () => {
        setOpenAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: 'calc(100vh - 100px)',
                    width: '100%'
                }}>
                    <CircularProgress />
                </Box>
            );
        }

        if (error) {
            return (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            );
        }

        return (
            <>
                <TitleHeader
                    title="Gestión de Ventas"
                    description="Administra el catálogo de ventas del sistema"
                    button={
                        <Button
                            variant="contained"
                            sx={{backgroundColor:"#F5C518", fontWeight: 600, color: "#0B2240"}}
                            onClick={handleAdd}
                            startIcon={<PointOfSale />}
                        >
                            AGREGAR VENTA
                        </Button>
                    }
                />
                
                <SalesDashboard totalIncome={totalIncome} salesData={sales} />
                
                <CommonTable
                    title="Lista de Ventas"
                    columns={columns}
                    rows={sales}
                    defaultRowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
                
                <AgregarVentaDialog 
                    open={openAddDialog}
                    onClose={handleCloseAddDialog}
                />
            </>
        );
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#EBEBEB', height: '100vh' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pl: 3,
                    pr: 3,
                    ml: `280px`,
                    height: '100%',
                    backgroundColor: '#f5f5f5'
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
} 