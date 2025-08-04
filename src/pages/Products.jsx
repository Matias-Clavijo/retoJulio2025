import React, { useState, useEffect } from "react";
import { Inventory, Visibility, Edit, Delete } from "@mui/icons-material";
import DataManagementPage from "../components/DataManagementPage";
import AgregarProductoDialog from "../components/DialogProductos";
import Eliminar from "../components/Eliminar";
import { productsAPI } from "../services/api/stockBack";
import { useListFormatter } from "../hooks/useListFormatter";
import DialogWatchProducts from "../components/DialogWatchProducts";
import DialogEditProduct from "../components/DialogEditProduct";
import { useNotification } from "../hooks/useNotification";

const primaryColor = '#0B2240';
const accentColor = '#F5C518';

export default function Products() {
  const { formatList } = useListFormatter();
  const { showError, showSuccess } = useNotification();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estados para ver producto
  const [openVer, setOpenVer] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Estados para editar producto
  const [openEditar, setOpenEditar] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProducts(page, rowsPerPage);
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
      } catch {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage, refetch]);

  const handleView = (product) => {
    setProductoSeleccionado(product.original || product);
    setOpenVer(true);
  };

  const handleCloseView = () => {
    setOpenVer(false);
    setProductoSeleccionado(null);
  };

  const handleEdit = (product) => {
    setProductoEditar(product.original);
    setOpenEditar(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product.original);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.deleteProduct(selectedProduct.id);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Producto eliminado exitosamente");
      } else {
        setError(response.error || "Error al eliminar el producto");
        showError("Error al eliminar el producto");
      }
    } catch {
      setError("Error al conectar con el servidor");
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

  const handleAddButtonClick = async (productData) => {
    try {
      const response = await productsAPI.createProduct(productData);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Producto agregado exitosamente");
      } else {
        setError(response.error);
        showError("Error al agregar el producto");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    }
  };

  const handleSaveEdit = async (productData) => {
    try {
      const response = await productsAPI.updateProduct(productoEditar.id, productData);
      if (response.success) {
        setRefetch(prev => prev + 1);
        showSuccess("Producto editado exitosamente");
      } else {
        setError(response.error);
        showError("Error al editar el producto");
      }
    } catch {
      setError("Error al conectar con el servidor");
      showError("Error al conectar con el servidor");
    }
  };

  const iconStyle = {
    cursor: 'pointer',
    fontSize: 22,
    margin: '0 6px',
    transition: 'color 0.3s',
  };

  const deleteIconStyle = {
    ...iconStyle,
    color: '#D32F2F',
    '&:hover': { color: '#9A0007' },
  };

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
    {
      id: "precios_compra",
      label: "Precios de compra",
      align: "left",
      format: (value) => {
        if (!Array.isArray(value) || value.length === 0) return '-';
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
      id: "precios_venta",
      label: "Precios de venta",
      align: "left",
      format: (value) => {
        if (!Array.isArray(value) || value.length === 0) return '-';
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
      format: (value) => {
        if (!Array.isArray(value) || value.length === 0) return '-';
        return formatList(value, {
          maxVisible: 2,
          showChips: true,
          chipColor: 'info',
          listTitle: 'Ver todos los depósitos'
        });
      }
    },
    {
      id: "acciones",
      label: "Acciones",
      align: "center",
      format: (_, row) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Visibility
            sx={{
              ...iconStyle,
              color: primaryColor,
              '&:hover': { color: accentColor },
            }}
            onClick={() => handleView(row)}
            titleAccess="Ver"
          />
          <Edit
            sx={{
              ...iconStyle,
              color: primaryColor,
              '&:hover': { color: accentColor },
            }}
            onClick={() => handleEdit(row)}
            titleAccess="Editar"
          />
          <Delete
            sx={deleteIconStyle}
            onClick={() => handleDelete(row)}
            titleAccess="Eliminar"
          />
        </div>
      )
    }
  ];

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
        addDialog={<AgregarProductoDialog buttonText="Agregar producto" title="Agregar producto" onAddButtonClick={handleAddButtonClick} />}
        loading={loading}
      />

      <Eliminar
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro que deseas eliminar el producto "${selectedProduct?.name}"?`}
      />

      <DialogWatchProducts
        open={openVer}
        onClose={handleCloseView}
        product={productoSeleccionado}
      />

      <AgregarProductoDialog
        onAddButtonClick={handleSaveEdit}
        buttonText={productoEditar ? 'Guardar cambios' : 'Agregar producto'}
        title={productoEditar ? 'Editar producto' : 'Agregar producto'}
        open={openEditar}
        onClose={() => setOpenEditar(false)}
        product={productoEditar}
      />
    </>
  );
}

