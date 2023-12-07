
// index.js
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const notasRoutes = require('./routes/notas');
const port = 3000;

// Conectar la base de datos sqlite
const db = new sqlite3.Database('notas.db');

// middleware para permitir cors y parseo
app.use(cors());
app.use(express.json());

// // Crear tabla de notas en la base de datos
// db.run('CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY, titulo TEXT, contenido TEXT)');

// Conectar las rutas relacionadas con notas
app.use('/notas', notasRoutes);

app.get('/notas', async (req, res) => {
  try {
    const notas = await db.getTodasLasNotas(); // Usa la función que obtiene todas las notas
    res.json(notas);
  } catch (error) {
    console.error('Error al obtener todas las notas:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


