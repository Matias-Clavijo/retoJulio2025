import React, { useState, useEffect } from "react";
import { Inventory } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarProductoDialog from "../components/DialogProductos";
import { productsAPI } from "../services/api/stockBack";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productsAPI.getProducts(page, rowsPerPage);
                if (response.success) {
                    // Transformar los datos al formato esperado por la tabla
                    const transformedProducts = response.data.map(product => ({
                        producto: product.name,
                        descripcion: product.description,
                        marca: product.brand.name,
                        categoria: product.category.name,
                        depositos: product.depositsCount,
                        total_stock: product.depositsCount * 10, // Ejemplo - ajustar según lógica real
                        // Mantener los datos originales para edición/visualización
                        original: product
                    }));
                    setProducts(transformedProducts);
                    setError(null);
                } else {
                    setError(response.error || "Error al cargar los productos");
                }
            } catch (_err) {
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, rowsPerPage]);

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
        { id: "depositos", label: "Depósitos", align: "center" },
        { id: "total_stock", label: "Total de stock", align: "center" },
        { id: "acciones", label: "Acciones", align: "center" },
    ];

    const handleEdit = (product) => {
        console.log("Editing product:", product.original || product);
    };

    const handleDelete = (product) => {
        console.log("Deleting product:", product.original || product);
    };

    const handleView = (product) => {
        console.log("Viewing product:", product.original || product);
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
            addDialog={<AgregarProductoDialog />}
            loading={loading}
            error={error}
        />
    );
} 