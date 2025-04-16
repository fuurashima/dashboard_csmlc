// ✅ Backend con seguridad mejorada, logs útiles y validación básica
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 🔐 Middleware de autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error('❌ Error al verificar token:', error.message);
    res.status(403).json({ message: 'Token inválido' });
  }
};

// 🔐 Login (no protegido)
app.post('/api/login', (req, res) => {
  const { user, pass } = req.body;
  if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Credenciales inválidas' });
});

// ✅ Registrar alumno (protegido)
app.post('/api/alumnos', authMiddleware, async (req, res) => {
  const {
    nombre_alumno,
    curso,
    nombre_apoderado,
    telefono_apoderado,
    email_apoderado,
    medio_conocimiento,
    estado_matricula = 'pendiente',
    rut
  } = req.body;

  console.log('📥 Body recibido en /api/alumnos:', req.body);

  // Validación básica
  if (!nombre_alumno || !curso || !nombre_apoderado || !rut) {
    return res.status(400).json({ message: 'Faltan campos obligatorios.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `INSERT INTO alumnos (nombre_alumno, curso, nombre_apoderado, telefono_apoderado, email_apoderado, medio_conocimiento, estado_matricula, rut)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre_alumno, curso, nombre_apoderado, telefono_apoderado, email_apoderado, medio_conocimiento, estado_matricula, rut]
    );
    await connection.end();
    res.json({ message: 'Alumno registrado correctamente.' });
  } catch (error) {
    console.error('❌ Error SQL:', error);
    res.status(500).json({ message: 'Error al registrar alumno.' });
  }
});

// 📊 Obtener estadísticas (protegido)
app.get('/api/estadisticas', authMiddleware, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT curso, estado_matricula, COUNT(*) as total FROM alumnos GROUP BY curso, estado_matricula`
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas.' });
  }
});

// 📋 Obtener alumnos por estado de matrícula
app.get('/api/alumnos/:estado', authMiddleware, async (req, res) => {
  const estado = req.params.estado;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT * FROM alumnos WHERE estado_matricula = ?`,
      [estado]
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener alumnos:', error);
    res.status(500).json({ message: 'Error al obtener alumnos.' });
  }
});

// 🔄 Cambiar estado de matrícula
app.put('/api/alumnos/:id/estado', authMiddleware, async (req, res) => {
  const id = req.params.id;
  const { estado_matricula } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      `UPDATE alumnos SET estado_matricula = ? WHERE id = ?`,
      [estado_matricula, id]
    );
    await connection.end();
    res.json({ message: 'Estado de matrícula actualizado.' });
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    res.status(500).json({ message: 'Error al actualizar estado.' });
  }
});

// 🔍 Buscar alumno por nombre o rut
app.get('/api/buscar', authMiddleware, async (req, res) => {
  const { query } = req.query;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT * FROM alumnos WHERE nombre_alumno LIKE ? OR rut LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('❌ Error en búsqueda:', error);
    res.status(500).json({ message: 'Error al buscar alumno.' });
  }
});

// 🚀 Puerto
app.listen(process.env.PORT || 3001, () => {
  console.log('✅ Servidor corriendo en el puerto', process.env.PORT || 3001);
});
