import React from "react";
import TitleHeader from "../components/common/TitelHeader";
import CommonTable from "../components/common/CommonTable";
import Button from "@mui/material/Button";
import AgregarMarca from "../components/DialogMarca.jsx"; 


export default function Brand() {
    const [openAgregarMarca, setOpenAgregarMarca] = React.useState(false);
  
    const columns = [
    { id: "codigo", label: "Código", minWidth: 100, align: "left" },
    { id: "nombre", label: "Nombre", minWidth: 100, align: "left" },
    { id: "pais", label: "País de origen", minWidth: 100, align: "left" }
  ];

  const rows = [
    { id: 1, codigo: "M001", nombre: "Marca A", pais: "Uruguay" },
    { id: 2, codigo: "M002", nombre: "Marca B", pais: "Argentina" },
    { id: 3, codigo: "M003", nombre: "Marca C", pais: "Brasil" }
  ];

  return (
    <>
      <AgregarMarca
        open={openAgregarMarca}
        onClose={() => setOpenAgregarMarca(false)}
      />

      <TitleHeader
        title="Gestión de Marcas"
        description="Administra las marcas del sistema"
        button={
        <Button 
            variant="contained"
            onClick={() => setOpenAgregarMarca(true)}
        >
            + NUEVA MARCA
        </Button>
        }
      />
      <CommonTable
        title="Lista de Marcas"
        columns={columns}
        rows={rows}
        defaultRowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}
