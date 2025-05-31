require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const API_URL = 'http://localhost:3000/api';
const cors = require('cors');


const authRoutes = require('./routes/auth');
const empleadosRoutes = require('./routes/empleados');

const { sequelize } = require('./models');

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/empleados', empleadosRoutes);

sequelize.sync().then(() => {
    console.log('Base de datos conectada.');
    app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
}).catch(err => {
    console.error('Error al conectar con la base de datos:', err);
});
