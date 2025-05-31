const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Empleado', {
        nombre: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        telefono: DataTypes.STRING,
        correo: DataTypes.STRING,
        direccion: DataTypes.TEXT
    });
};
