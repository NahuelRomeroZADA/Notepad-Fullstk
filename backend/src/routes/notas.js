const express = require('express');
const router = express.Router();
const db = require('../../db'); // Importa el módulo para interactuar con la base de datos

// Obtener todas las notas (activas o archivadas)
router.get('/', async (req, res) => {
  try {
    const estado = req.query.estado || 'activas'; // Utilizamos req.query para obtener el parámetro de la consulta
    const notas = await db.getNotasByEstado(estado);
    res.json(notas);
  } catch (error) {
    console.error(`Error al obtener las notas ${req.query.estado || 'activas'}:`, error);
    res.status(500).send(`Error interno al obtener las notas ${req.query.estado || 'activas'}`);
  }
});

// Crear una nueva nota
router.post('/', async (req, res) => {
  const { titulo, contenido } = req.body;
  try {
    const nuevaNotaId = await db.createNota(titulo, contenido);
    res.json({ id: nuevaNotaId });
  } catch (error) {
    console.error('Error al crear la nota:', error);
    res.status(500).send('Error interno al crear la nota');
  }
});

// Eliminar una nota por su ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.deleteNota(id);
    console.log(`Nota con ID ${id} eliminada`);
    res.status(200).send('Nota eliminada correctamente');
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
    res.status(500).send('Error interno al eliminar la nota');
  }
});

// Ruta para editar una nota por su ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, contenido } = req.body;

  try {
    await db.updateNota(id, titulo, contenido);
    console.log(`Nota con ID ${id} actualizada`);
    res.status(200).send('Nota actualizada correctamente');
  } catch (error) {
    console.error('Error al editar la nota:', error);
    res.status(500).send('Error interno al editar la nota');
  }
});

// Obtener todas las notas (activas o archivadas)
router.get('/:estado?', async (req, res) => {
  try {
    const estado = req.params.estado || 'activas'; // Valor predeterminado: 'activas'
    const notas = await db.getNotasByEstado(estado);
    res.json(notas);
  } catch (error) {
    console.error(`Error al obtener las notas ${req.params.estado || 'activas'}:`, error);
    res.status(500).send(`Error interno al obtener las notas ${req.params.estado || 'activas'}`);
  }
});

// Obtener todas las notas (activas y archivadas)
router.get('/todas', async (req, res) => {
  try {
    const notas = await db.getTodasLasNotas();
    res.json(notas);
  } catch (error) {
    console.error('Error al obtener todas las notas:', error);
    res.status(500).send('Error interno del servidor');
  }
});


// Archivar una nota por su ID
router.post('/:id/archivar', async (req, res) => {
  const id = req.params.id;
  try {
    await db.archivarNota(id);
    console.log(`Nota con ID ${id} archivada`);
    res.status(200).send('Nota archivada correctamente');
  } catch (error) {
    console.error('Error al archivar la nota:', error);
    res.status(500).send('Error interno al archivar la nota');
  }
});

// Desarchivar una nota por su ID
router.post('/:id/desarchivar', async (req, res) => {
  const id = req.params.id;
  try {
    await db.desarchivarNota(id);
    console.log(`Nota con ID ${id} desarchivada`);
    res.status(200).send('Nota desarchivada correctamente');
  } catch (error) {
    console.error('Error al desarchivar la nota:', error);
    res.status(500).send('Error interno al desarchivar la nota');
  }
});

module.exports = router;
