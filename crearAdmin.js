require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Usuario, sequelize } = require('./models');

async function crearAdmin() {
  const username = 'admin';
  const passwordPlano = 'admin123';

  const passwordEncriptado = await bcrypt.hash(passwordPlano, 10);

  try {
    await sequelize.sync();

    const [admin, creado] = await Usuario.findOrCreate({
      where: { username },
      defaults: { password: passwordEncriptado }
    });

    if (creado) {
      console.log('Usuario administrador creado:');
    } else {
      console.log('El usuario ya existía:');
    }

    console.log({ username, password: passwordPlano });
  } catch (error) {
    console.error('Error al crear el administrador:', error);
  } finally {
    await sequelize.close();
  }
}

crearAdmin();
