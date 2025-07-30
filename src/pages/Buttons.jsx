import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';

import EditarDeposito from '../components/editarDeposito';
import AgregarProductoDialog from '../components/DialogProductos';
import AgregarMarca from '../components/Agregarmarca';
import GestionStockDialog from '../components/DialogStock';
import AgregarProveedorDialog from '../components/DialogProveedor';
import AgregarCategoriaDialog from '../components/AgregarCategoría.jsx';
import AgregarVentaDialog from '../components/DialogVenta.jsx';
import Eliminar from "../components/Eliminar";
import AgregarStock from '../components/AgregarStock';

export default function Buttons() {
    const [openEditarDeposito, setOpenEditarDeposito] = useState(false);
    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openStockDialog, setOpenStockDialog] = useState(false);
    const [openAgregarMarca, setOpenAgregarMarca] = useState(false);
    const [openDialogProveedor, setOpenAgregarProveedor] = useState(false);
    const [openDialogCategoria, setOpenAgregarCategoria] = useState(false);
    const [openAgregarVenta, setOpenAgregarVenta] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openAgregarStock, setOpenAgregarStock] = useState(false);

    const yellow = '#F5C518';
    const darkBlue = '#0B2240';

    const buttonStyle = {
        backgroundColor: yellow,
        color: darkBlue,
        fontWeight: 600,
        boxShadow: 2,
        '&:hover': {
            backgroundColor: '#e4b414'
        }
    };

    return (
        <Container>
            <h1>Panel de Acciones</h1>
            <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenEditarDeposito(true)}>
                    Agregar Depósito
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenAgregarProducto(true)}>
                    Agregar Producto
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenStockDialog(true)}>
                    Gestión de Stock
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenAgregarMarca(true)}>
                    Agregar Marca
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenAgregarProveedor(true)}>
                    Agregar Proveedor
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenAgregarCategoria(true)}>
                    Agregar Categoría
                </Button>

                <Button variant="contained" sx={buttonStyle} onClick={() => setOpenAgregarVenta(true)}>
                    Agregar Venta
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenEliminar(true)}
                    sx={{ mt: 2, fontWeight: 600 }}
                >
                    Eliminar
                </Button>

                <Button
                    variant="contained"
                    onClick={() => setOpenAgregarStock(true)}
                    sx={{ ...buttonStyle, mt: 2 }}
                >
                    Agregar Stock
                </Button>
            </Box>

            <EditarDeposito open={openEditarDeposito} onClose={() => setOpenEditarDeposito(false)} />
            <AgregarProductoDialog open={openAgregarProducto} onClose={() => setOpenAgregarProducto(false)} />
            <GestionStockDialog open={openStockDialog} onClose={() => setOpenStockDialog(false)} />
            <AgregarMarca open={openAgregarMarca} onClose={() => setOpenAgregarMarca(false)} />
            <AgregarProveedorDialog open={openDialogProveedor} onClose={() => setOpenAgregarProveedor(false)} />
            <AgregarCategoriaDialog open={openDialogCategoria} onClose={() => setOpenAgregarCategoria(false)} />
            <AgregarVentaDialog open={openAgregarVenta} onClose={() => setOpenAgregarVenta(false)} />
            <Eliminar
                open={openEliminar}
                onClose={() => setOpenEliminar(false)}
                onConfirm={() => {
                    console.log('Producto eliminado');
                    setOpenEliminar(false);
                }}
            />
            <AgregarStock open={openAgregarStock} onClose={() => setOpenAgregarStock(false)} />
        </Container>
    );
}
