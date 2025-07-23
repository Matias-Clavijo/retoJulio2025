
import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import AgregarMarca from '../components/Agregarmarca';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      <h1>Home</h1>
      <Button variant="contained" onClick={() => setOpenModal(true)}>
        Agregar Marca
      </Button>
      <AgregarMarca open={openModal} onClose={() => setOpenModal(false)} />
    </Container>
  );
}

