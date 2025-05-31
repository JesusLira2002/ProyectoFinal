

const bcrypt = require('bcrypt');

// Hash de tu base de datos:
const hash = '$2b$10$lpPtvEKvW6y0AiOnxnUmwOoTt0u6rVnU5TLBWmGjMFg90TPZCrPSK';
// Contraseña en texto plano que quieres verificar:
const plainPassword = 'admin123';

bcrypt.compare(plainPassword, hash).then(result => {
  console.log('¿Coincide?', result); // Debe mostrar true si es correcto
}).catch(err => {
  console.error('Error:', err);
});
