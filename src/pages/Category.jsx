import React, { useState } from "react";
import CommonTable from "../components/common/Table";
import TitleHeader from "../components/common/TitelHeader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function Category() {
  const estiloContenedor = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    fontSize: "2rem",
    fontWeight: "bold",
    gap: "20px",
    margin: 0,
    padding: 0,
  };

  const estiloTabla = {
    borderCollapse: "collapse",
    fontSize: "1rem",
    width: "80%",
  };

  const estiloCelda = {
    border: "1px solid black",
    padding: "8px",
    verticalAlign: "top",
  };

  const estiloBoton = {
    margin: "0 4px",
    padding: "4px 8px",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  const [personas, setPersonas] = useState([
    { id: 1, nombre: "Juan", descripcion: "Estudiante", edad: 25 },
    { id: 2, nombre: "Ana", descripcion: "Ingeniera", edad: 30 },
    { id: 3, nombre: "Luis", descripcion: "Diseñador", edad: 28 },
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    descripcion: "",
    edad: "",
  });
  const [verId, setVerId] = useState(null);

  const nombresDesplegable = ["Carlos", "María", "Sofía", "Pedro", "Lucía"];

  const eliminarPersona = (id) => {
    setPersonas((prev) => prev.filter((p) => p.id !== id));
    if (editandoId === id) setEditandoId(null);
    if (verId === id) setVerId(null);
  };

  const iniciarEdicion = (persona) => {
    setEditandoId(persona.id);
    setFormEdit({
      nombre: persona.nombre,
      descripcion: persona.descripcion,
      edad: persona.edad,
    });
    setVerId(null);
  };

  const cancelarEdicion = () => {
    const persona = personas.find((p) => p.id === editandoId);
    if (persona?.nuevo) {
      setPersonas(personas.filter((p) => p.id !== editandoId));
    }
    setEditandoId(null);
  };

  const guardarEdicion = (id) => {
    setPersonas((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              nombre: formEdit.nombre,
              descripcion: formEdit.descripcion,
              edad: Number(formEdit.edad),
            }
          : p
      )
    );
    cancelarEdicion();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVer = (id) => {
    setVerId(verId === id ? null : id);
    setEditandoId(null);
  };

  const agregarPersona = () => {
    const nuevoId =
      personas.length > 0 ? Math.max(...personas.map((p) => p.id)) + 1 : 1;
    const nuevaPersona = {
      id: nuevoId,
      nombre: "Nuevo",
      descripcion: "Sin descripción",
      edad: 0,
      nuevo: true, // << indicador
    };
    setPersonas([...personas, nuevaPersona]);
    setEditandoId(nuevoId);
    setFormEdit({
      nombre: nuevaPersona.nombre,
      descripcion: nuevaPersona.descripcion,
      edad: nuevaPersona.edad,
    });
    setVerId(null);
  };

  const columns = [
  { id: 'codigo', label: 'Código', minWidth: 100, align: 'left' },
  { id: 'nombre', label: 'Nombre', minWidth: 100, align: 'left' },
  { id: 'precio', label: 'Precio', minWidth: 100, align: 'left', format: (value) => `$${value.toFixed(2)}` },
  { id: 'acciones', label: 'Acciones', minWidth: 120, align: 'center' },
];

const rows = [
  { id: 1, codigo: 'A001', nombre: 'Producto 1', precio: 123.45 },
  { id: 2, codigo: 'A002', nombre: 'Producto 2', precio: 67.89 },
].map((row) => ({
  ...row,
  acciones: (
    <>
      <IconButton size="small" onClick={() => toggleVer(row.id)}>
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={() => iniciarEdicion(row)}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={() => eliminarPersona(row.id)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  ),
}));


return (
  <><TitleHeader
  title={"Gestión de Categorías"}
  description={"Administra las categorías de los productos"}
  />
  <CommonTable
    title="Lista de catgorias"
    columns={columns}
    rows={rows}
    defaultRowsPerPage={5}
    rowsPerPageOptions={[5, 10, 25]}
  />
  </>
);

}
