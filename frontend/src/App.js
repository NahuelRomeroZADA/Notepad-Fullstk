import React, { useState, useEffect } from 'react';
import './styles/app.css';
import CrearNota from './components/CrearNota';
import EditarNota from './components/EditarNota';
import EliminarNota from './components/EliminarNota';
import Nota from './components/Nota';
import api from './api';

function App() {
  const [notas, setNotas] = useState([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [mostrarActivas, setMostrarActivas] = useState(true);
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

  const cargarNotas = async () => {
    try {
      const estado = mostrarArchivadas ? 'archivadas' : 'activas';
      const response = await api.get(`/notas/${estado}`);
      setNotas(response.data);
    } catch (error) {
      console.error('Error al cargar las notas:', error);
    }
  };

  useEffect(() => {
    cargarNotas();
  }, [mostrarActivas, mostrarArchivadas]);

  const handleNotaCreada = (id) => {
    console.log('Nota creada con ID:', id);
    cargarNotas();
  };

  const handleNotaEditada = async (id, nuevaData) => {
    try {
      await api.put(`/notas/${id}`, nuevaData);
      console.log(`Nota con ID ${id} editada`);
      cargarNotas();
      setNotaSeleccionada(null);
    } catch (error) {
      console.error('Error al editar la nota:', error);
    }
  };

  const handleNotaEliminada = async (id) => {
    try {
      await api.delete(`/notas/${id}`);
      console.log(`Nota con ID ${id} eliminada`);
      cargarNotas();
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  const handleEditar = (nota) => {
    setNotaSeleccionada(nota);
  };

  const handleCancelarEdicion = () => {
    setNotaSeleccionada(null);
  };

  const handleArchivarDesarchivar = async (id, archivar) => {
    try {
      const url = archivar ? `/notas/${id}/archivar` : `/notas/${id}/desarchivar`;
      await api.post(url);
      console.log(`Nota con ID ${id} ${archivar ? 'archivada' : 'desarchivada'}`);
      cargarNotas();
    } catch (error) {
      console.error(`Error al ${archivar ? 'archivar' : 'desarchivar'} la nota:`, error);
    }
  };

  return (
    <div className='container'>
      <h1>Notepad</h1>
      <div>
        <button onClick={() => { setMostrarActivas(true); setMostrarArchivadas(false); }}>Mostrar Activas</button>
        <button onClick={() => { setMostrarActivas(false); setMostrarArchivadas(true); }}>Mostrar Archivadas</button>
      </div>
      
      {notaSeleccionada ? (
        <>
          <EditarNota nota={notaSeleccionada} onNotaEditada={handleNotaEditada} />
          <button onClick={handleCancelarEdicion}>Cancelar Edición</button>
        </>
      ) : (
        <>
          <CrearNota onNotaCreada={handleNotaCreada} />
          <h2>Notes</h2>
          {notas.map((nota) => (
            <Nota
              key={nota.id}
              nota={nota}
              onEditar={handleEditar}
              onEliminar={handleNotaEliminada}
              onArchivar={() => handleArchivarDesarchivar(nota.id, true)}
              onDesarchivar={() => handleArchivarDesarchivar(nota.id, false)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;






