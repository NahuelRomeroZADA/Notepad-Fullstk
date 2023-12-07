// frontend/src/components/CrearNota.js
import React, { useState } from 'react';
import api from '../api';

const CrearNota = ({ onNotaCreada }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleCrearNota = async () => {
    try {
      if (!titulo || !contenido) {
        alert('Por favor, completa tanto el título como el contenido antes de crear la nota.');
        return;
      }

      const response = await api.post('/notas/', { titulo, contenido });
      console.log('Nota creada:', response.data);
      onNotaCreada(response.data.id);
      setTitulo('');
      setContenido('');
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  return (
    <div>
      <h2>Crear Nota</h2>
      <label>Título:</label>
      <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      <label className='contenidoLabel'>Contenido:</label>
      <input type="text" value={contenido} onChange={(e) => setContenido(e.target.value)} />
      <button onClick={handleCrearNota}>Crear Nota</button>
    </div>
  );
};

export default CrearNota;