const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Configura la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proyecto Final'
});

// Middleware para verificar el token JWT
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  jwt.verify(token, 'clave_secreta', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Obtener todos los empleados o filtrar por nombre
router.get('/', autenticarToken, (req, res) => {
  const nombre = req.query.nombre;
  const sql = nombre
    ? 'SELECT * FROM empleados WHERE nombre LIKE ?'
    : 'SELECT * FROM empleados';
  const params = nombre ? [`%${nombre}%`] : [];

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener empleados' });
    res.json(results);
  });
});

// Agregar un nuevo empleado
router.post('/', autenticarToken, (req, res) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;
  const sql = 'INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nombre, apellidos, telefono, correo, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar empleado' });
    res.json({ mensaje: 'Empleado agregado correctamente' });
  });
});

// Modificar un empleado existente
router.put('/:id', autenticarToken, (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, telefono, correo, direccion } = req.body;
  const sql = 'UPDATE empleados SET nombre = ?, apellidos = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?';
  db.query(sql, [nombre, apellidos, telefono, correo, direccion, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar empleado' });
    res.json({ mensaje: 'Empleado actualizado correctamente' });
  });
});

// Eliminar un empleado
router.delete('/:id', autenticarToken, (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM empleados WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar empleado' });
    res.json({ mensaje: 'Empleado eliminado correctamente' });
  });
});

module.exports = router;
