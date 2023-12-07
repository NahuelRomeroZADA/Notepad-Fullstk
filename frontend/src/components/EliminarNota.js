// frontend/src/components/EliminarNota.js
import React from 'react';
import api from '../api';

// En tu componente principal
const EliminarNota = ({ notaId, onNotaEliminada }) => {
  const handleEliminarNota = async () => {
    try {
      await api.delete(`/notas/${notaId}`);
      console.log(`Nota con ID ${notaId} eliminada`);
      // Llamar a la función de devolución de llamada para manejar la actualización del estado
      onNotaEliminada && onNotaEliminada(notaId);
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  return (
    <div>
      <h2>Eliminar Nota</h2>
      <p>¿Estás seguro de que quieres eliminar esta nota?</p>
      <button onClick={handleEliminarNota}>Eliminar</button>
    </div>
  );
};



export default EliminarNota;