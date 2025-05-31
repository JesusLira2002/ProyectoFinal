const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Proyecto Final', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Importa el modelo y pasa sequelize y DataTypes correctamente
const Usuario = require('./usuario')(sequelize, DataTypes);
const Empleado = require('./empleado')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Usuario,
  Empleado
};
