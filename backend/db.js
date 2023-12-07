const sqlite3 = require('sqlite3');
// Conectar la base de datos sqlite
const db = new sqlite3.Database('notas.db');

// Crear tabla de notas en la base de datos
db.run('CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY, titulo TEXT, contenido TEXT, archivada BOOLEAN DEFAULT 0)', (err) => {
  if (err) {
    console.error('Error al crear la tabla de notas:', err);
  } else {
    console.log('Tabla de notas creada correctamente');
  }
});


// Funciones para interactuar con la base de datos
const getAllNotas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notas', (err, notas) => {
      if (err) {
        reject(err);
      } else {
        resolve(notas);
      }
    });
  });
};

const createNota = (titulo, contenido) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO notas (titulo, contenido) VALUES (?, ?)', [titulo, contenido], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const deleteNota = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM notas WHERE id = ?', id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const archivarNota = (id) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE notas SET archivada = 1 WHERE id = ?', id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const desarchivarNota = (id) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE notas SET archivada = 0 WHERE id = ?', id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Función para actualizar una nota por su ID
const updateNota = async (id, titulo, contenido) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE notas SET titulo = ?, contenido = ? WHERE id = ?', [titulo, contenido, id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Función para obtener notas por su estado (activas o archivadas)
const getNotasByEstado = (estado) => {
  return new Promise((resolve, reject) => {
    const query = estado === 'archivadas' ? 'SELECT * FROM notas WHERE archivada = 1' : 'SELECT * FROM notas WHERE archivada = 0';
    db.all(query, (err, notas) => {
      if (err) {
        console.error(`Error al ejecutar la consulta SQL: ${query}`, err);
        reject(err);
      } else {
        resolve(notas);
      }
    });
  });
};

const getNotasActivas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notas WHERE archivada = 0', (err, notas) => {
      if (err) {
        reject(err);
      } else {
        resolve(notas);
      }
    });
  });
};

const getArchivedNotas = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notas WHERE archivada = 1', (err, notas) => {
      if (err) {
        reject(err);
      } else {
        resolve(notas);
      }
    });
  });
};

const getTodasLasNotas = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM notas';
    db.all(sql, [], (error, notas) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(notas);
    });
  });
};


module.exports = {
  getAllNotas,
  createNota,
  deleteNota,
  archivarNota,
  desarchivarNota,
  updateNota,
  getNotasByEstado,
  getNotasActivas,
  getArchivedNotas,
  getTodasLasNotas
};
