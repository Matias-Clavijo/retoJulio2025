import React, { useState, useEffect } from "react";
import { Inventory } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarProductoDialog from "../components/DialogProductos";
import Eliminar from "../components/Eliminar";
import { productsAPI } from "../services/api/stockBack";
import { Snackbar, Alert } from '@mui/material';


import { useListFormatter } from "../hooks/useListFormatter";

export default function Products() {
    const { formatList } = useListFormatter();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refetch, setRefetch] = useState(0);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (refetch === 1) {
                    setLoading(true);
                }
                const response = await productsAPI.getProducts(page, rowsPerPage);
                console.log(response);
                if (response.success) {
                    const transformedProducts = response.data.map(product => ({
                        producto: product.name,
                        descripcion: product.description,
                        marca: product.brand?.name || '-',
                        categoria: product.category?.name || '-',
                        depositos: product.deposits || [],
                        precios_compra: product.purchasePrices,
                        precios_venta: product.salePrices,
                        original: product
                    }));
                    setProducts(transformedProducts);
                    setError(null);
                } else {
                    setError(response.error || "Error al cargar los productos");
                }
            } catch (error ) {
                console.log(error);
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, rowsPerPage, refetch]);

    const columns = [
        {
            id: "producto",
            label: "Producto",
            align: "left",
            format: (value, row) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{row.producto}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{row.descripcion}</div>
                </div>
            )
        },
        { id: "marca", label: "Marca", align: "left" },
        { id: "categoria", label: "Categoría", align: "left" },
        { id: "precios_compra", label: "Precios de compra", align: "left",
            format: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return '-';
                }
                const values = value.map(price => price.currency + ' ' + price.value);
                return formatList(values, {
                    maxVisible: 1,
                    showChips: true,
                    chipColor: 'info',
                    listTitle: 'Ver todos precios'
                });
            }            
        },
        { id: "precios_venta", label: "Precios de venta", align: "left", 
            format: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return '-';
                }
                const values = value.map(price => price.currency + ' ' + price.value);
                return formatList(values, {
                    maxVisible: 1,
                    showChips: true,
                    chipColor: 'info',
                    listTitle: 'Ver todos precios'
                });
            }            
         },
        { 
            id: "depositos", 
            label: "Depósitos", 
            align: "center",
            // ✅ USAR formatList del custom hook
            format: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    return '-';
                }
                
                return formatList(value, {
                    maxVisible: 2,
                    showChips: true,
                    chipColor: 'info',
                    listTitle: 'Ver todos los depósitos'
                });
            }
        },
        { id: "acciones", label: "Acciones", align: "center" },
    ];

    const handleEdit = (product) => {
        console.log("Editing product:", product.original || product);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setOpenDeleteDialog(true);
    };

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.deleteProduct(selectedProduct.original.id);
            if (response.success) {
                const newResponse = await productsAPI.getProducts(page, rowsPerPage);
                if (newResponse.success) {
                    const transformedProducts = newResponse.data.map(product => ({
                        producto: product.name,
                        descripcion: product.description,
                        marca: product.brand.name,
                        categoria: product.category.name,
                        depositos: product.deposits || [],
                        total_stock: product.depositsCount * 10,
                        original: product
                    }));
                    setProducts(transformedProducts);
                }
            } else {
                setError(response.error || "Error al eliminar el producto");
            }
        } catch {
            setError("Error al conectar con el servidor");
            setErrorSnackbar(true);
        } finally {
            setLoading(false);
            handleCloseDelete();
        }
    };

    const handleView = (product) => {
        console.log("Viewing product:", product.original || product);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setPage(1);
    };

    const handleAddButtonClick = async (productData) => {
        console.log(productData);
        const response = await productsAPI.createProduct(productData);
        if (!response.success) {
            setError(response.error);
        } else {
            setRefetch(refetch + 1);
        }
    };

    return (
        <>
            <DataManagementPage
                title="Gestión de Productos"
                description="Administra el catálogo de productos del sistema"
                addButtonText="NUEVO PRODUCTO"
                addButtonIcon={<Inventory />}
                tableTitle="Lista de productos"
                columns={columns}
                data={products}
                defaultRowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                showViewAction={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                addDialog={<AgregarProductoDialog onAddButtonClick={handleAddButtonClick} />}
                loading={loading}
                error={error}
            />
            <Eliminar
                open={openDeleteDialog}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                title={`¿Estás seguro que deseas eliminar el producto "${selectedProduct?.producto}"?`}
            />

            <Snackbar
                open={errorSnackbar}
                autoHideDuration={5000}
                onClose={() => setErrorSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            
        </>
    );
}
