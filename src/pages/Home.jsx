
import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import EditarDeposito from '../components/editarDeposito';
import AgregarProductoDialog from "../components/DialogProductos";
import AgregarMarca from "../components/Agregarmarca.jsx";
import GestionStockDialog from "../components/DialogStock.jsx";
import Eliminar from "../components/Eliminar";
import AgregarStock from '../components/AgregarStock';



export default function Home() {
    const [openEditarDeposito, setOpenEditarDeposito] = useState(false);
    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openStockDialog, setOpenStockDialog] = useState(false);
    const [openAgregarMarca, setOpenAgregarMarca] = useState(false);
    const [openEliminar, setOpenEliminar] = useState(false);
    const [openAgregarStock, setOpenAgregarStock] = useState(false);



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

            <Button
                variant="contained"
                color="error"
                onClick={() => setOpenEliminar(true)}
                sx={{ mt: 2 }}
            >       
                Eliminar
            </Button>

            <Button
                variant="contained"
                onClick={() => setOpenAgregarStock(true)}
                sx={{ mt: 2 }}
            >
                Agregar Stock
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

            <Eliminar
                open={openEliminar}
                onClose={() => setOpenEliminar(false)}
                onConfirm={() => {
                console.log('Producto eliminado');
                setOpenEliminar(false);
              }}
            />

            <AgregarStockDialog
                open={openAgregarStock}
                onClose={() => setOpenAgregarStock(false)}
            />


        </Container>
    );

    
}
