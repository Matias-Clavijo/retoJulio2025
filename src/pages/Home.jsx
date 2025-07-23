
import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import EditarDeposito from '../components/editarDeposito';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      <h1>Inicio</h1>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Editar Depósito
      </Button>
      <EditarDeposito open={openModal} onClose={() => setOpenModal(false)} />
    </Container>
  );
}


