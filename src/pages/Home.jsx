import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';

import EditarDeposito from '../components/editarDeposito';
import AgregarProductoDialog from '../components/DialogProductos';
import AgregarMarca from '../components/Agregarmarca';
import GestionStockDialog from '../components/DialogStock';
import AgregarProveedorDialog from '../components/DialogProveedor';
import AgregarCategoriaDialog from '../components/AgregarCategoría.jsx';
import Eliminar from "../components/Eliminar";
import Category from './Category';

export default function Home() {
    const [openEditarDeposito, setOpenEditarDeposito] = useState(false);
    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openStockDialog, setOpenStockDialog] = useState(false);
    const [openAgregarMarca, setOpenAgregarMarca] = useState(false);
    const [openDialogProveedor, setOpenAgregarProveedor] = useState(false);
    const [openDialogCategoria, setOpenAgregarCategoria] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);

    return (
        <Container>
            <h1>Inicio</h1>
            <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
                <Button variant="contained" onClick={() => setOpenEditarDeposito(true)}>
                    Agregar Depósito
                </Button>

                <Button variant="contained" onClick={() => setOpenAgregarProducto(true)}>
                    Agregar Producto
                </Button>

                <Button variant="contained" onClick={() => setOpenStockDialog(true)}>
                    Gestión de Stock
                </Button>

                <Button variant="contained" onClick={() => setOpenAgregarMarca(true)}>
                    Agregar Marca
                </Button>

                <Button variant="contained" onClick={() => setOpenAgregarProveedor(true)}>
                    Agregar Proveedor
                </Button>

                <Button variant="contained" onClick={() => setOpenAgregarCategoria(true)}>
                    Agregar Categoría
                </Button>
            </Box>

            <Button
                variant="contained"
                color="error"
                onClick={() => setOpenEliminar(true)}
                sx={{ mt: 2 }}
            >
                Eliminar
            </Button>

            <EditarDeposito
                open={openEditarDeposito}
                onClose={() => setOpenEditarDeposito(false)}
            />

            <AgregarProductoDialog
                open={openAgregarProducto}
                onClose={() => setOpenAgregarProducto(false)}
            />

            <GestionStockDialog
                open={openStockDialog}
                onClose={() => setOpenStockDialog(false)}
            />

            <AgregarMarca
                open={openAgregarMarca}
                onClose={() => setOpenAgregarMarca(false)}
            />

            <AgregarProveedorDialog
                open={openDialogProveedor}
                onClose={() => setOpenAgregarProveedor(false)}
            />

            <AgregarCategoriaDialog
                open={openDialogCategoria}
                onClose={() => setOpenAgregarCategoria(false)}
            />

            <Eliminar
                open={openEliminar}
                onClose={() => setOpenEliminar(false)}
                onConfirm={() => {
                    console.log('Producto eliminado');
                    setOpenEliminar(false);
                }}
            />
        </Container>
    );
}
