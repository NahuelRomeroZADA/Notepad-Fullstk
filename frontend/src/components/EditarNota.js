// frontend/src/components/EditarNota.js
import React, { useState } from 'react';
import api from '../api';

const EditarNota = ({ nota, onNotaEditada }) => {
  const [nuevaNota, setNuevaNota] = useState({
    titulo: nota.titulo,
    contenido: nota.contenido,
  });

  const handleEditarNota = async () => {
    try {
      await api.put(`/notas/${nota.id}`, nuevaNota);
      console.log(`Nota con ID ${nota.id} editada`);
      // Llama a la función de devolución de llamada para manejar la actualización del estado en App.js
      onNotaEditada(nota.id, nuevaNota);
    } catch (error) {
      console.error('Error al editar la nota:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaNota((prevNota) => ({
      ...prevNota,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Editar Nota</h2>
      <label htmlFor="titulo">Título:</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={nuevaNota.titulo}
        onChange={handleInputChange}
      />
      <label htmlFor="contenido">Contenido:</label>
      <textarea
        id="contenido"
        name="contenido"
        value={nuevaNota.contenido}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleEditarNota}>Guardar Cambios</button>
    </div>
  );
};

export default EditarNota;