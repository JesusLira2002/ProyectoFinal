const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Proyecto Final'
});

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar al usuario en la base de datos
  const sql = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = results[0];

    // Comparar contraseñas
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar token JWT
    const token = jwt.sign({ id: usuario.id, username: usuario.username }, 'clave_secreta', {
      expiresIn: '1h'
    });

    res.json({ token });
  });
});

module.exports = router;
