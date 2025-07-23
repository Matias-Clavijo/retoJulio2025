
import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import EditarDeposito from '../components/editarDeposito';
import AgregarProductoDialog from "../components/DialogProductos";
import AgregarMarca from "../components/Agregarmarca.jsx";
import GestionStockDialog from "../components/DialogStock.jsx";

export default function Home() {
    const [openEditarDeposito, setOpenEditarDeposito] = useState(false);
    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openStockDialog, setOpenStockDialog] = useState(false);
    const [openAgregarMarca, setOpenAgregarMarca] = useState(false);

    return (
        <Container>
            <h1>Inicio</h1>

            <Button
                variant="contained"
                onClick={() => setOpenEditarDeposito(true)}
                sx={{ mr: 2 }}
            >
                Agregar Depósito
            </Button>

            <Button
                variant="contained"
                onClick={() => setOpenAgregarProducto(true)}
                sx={{ mr: 2 }}
            >
                Agregar Producto
            </Button>

            <Button
                variant="contained"
                onClick={() => setOpenStockDialog(true)}
                sx={{ mr: 2 }}
            >
                Gestión de Stock
            </Button>

            <Button
                variant="contained"
                onClick={() => setOpenAgregarMarca(true)}
            >
                Agregar Marca
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
        </Container>
    );
}
