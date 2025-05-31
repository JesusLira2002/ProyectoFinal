const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Usuarios', // asegúrate de que coincida con el nombre en la BD
    timestamps: false      // 🔴 ESTA LÍNEA DESACTIVA createdAt y updatedAt
  });

  return Usuario;
};

