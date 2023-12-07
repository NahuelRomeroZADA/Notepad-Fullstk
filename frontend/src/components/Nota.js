// frontend/src/components/Nota.js
import React, { useState } from 'react';
import EliminarNota from './EliminarNota';

const Nota = ({ nota, onEditar, onEliminar, onArchivar, onDesarchivar }) => {
  const [mostrarEliminar, setMostrarEliminar] = useState(false);

  const handleEditar = () => {
    onEditar(nota);
  };

  const handleEliminar = () => {
    setMostrarEliminar(true);
  };

  const handleArchivar = () => {
    onArchivar(nota.id);
  };

  const handleDesarchivar = () => {
    onDesarchivar(nota.id);
  };

  return (
    <div>
      <p>Título: {nota.titulo}</p>
      <p className='nota-contenido'>Contenido: {nota.contenido}</p>
      <button onClick={handleEditar}>Editar</button>
      <button onClick={handleEliminar}>Eliminar</button>
      {nota.archivada ? (
        <button onClick={handleDesarchivar}>Desarchivar</button>
      ) : (
        <button onClick={handleArchivar}>Archivar</button>
      )}

      {mostrarEliminar && (
        <EliminarNota notaId={nota.id} onNotaEliminada={() => onEliminar(nota.id)} />
      )}
    </div>
  );
};

export default Nota;
