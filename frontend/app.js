const API_URL = 'http://localhost:3000/api';;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('panel-section').style.display = 'block';
        obtenerEmpleados();
      } else {
        document.getElementById('login-error').textContent = data.error || 'Error al iniciar sesión';
      }
    })
    .catch(err => {
      document.getElementById('login-error').textContent = 'Error al conectar con el servidor';
      console.error(err);
    });
}

function logout() {
  localStorage.removeItem('token');
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('panel-section').style.display = 'none';
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  };
}

function obtenerEmpleados() {
  fetch(`${API_URL}/empleados`, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => mostrarEmpleados(data));
}

function mostrarEmpleados(empleados) {
  const tbody = document.querySelector('#empleadosTable tbody');
  tbody.innerHTML = '';
  empleados.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.nombre}</td>
      <td>${emp.apellidos}</td>
      <td>${emp.telefono}</td>
      <td>${emp.correo}</td>
      <td>${emp.direccion}</td>
      <td>
        <button onclick='editarEmpleado(${JSON.stringify(emp)})'>Editar</button>
        <button onclick='eliminarEmpleado(${emp.id})'>Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function guardarEmpleado() {
  const id = document.getElementById('idEmpleado').value;
  const empleado = {
    nombre: document.getElementById('nombre').value,
    apellidos: document.getElementById('apellidos').value,
    telefono: document.getElementById('telefono').value,
    correo: document.getElementById('correo').value,
    direccion: document.getElementById('direccion').value
  };

  const url = id ? `${API_URL}/empleados/${id}` : `${API_URL}/empleados`;
  const method = id ? 'PUT' : 'POST';

  fetch(url, {
    method,
    headers: getHeaders(),
    body: JSON.stringify(empleado)
  }).then(() => {
    limpiarFormulario();
    obtenerEmpleados();
  });
}

function editarEmpleado(emp) {
  document.getElementById('idEmpleado').value = emp.id;
  document.getElementById('nombre').value = emp.nombre;
  document.getElementById('apellidos').value = emp.apellidos;
  document.getElementById('telefono').value = emp.telefono;
  document.getElementById('correo').value = emp.correo;
  document.getElementById('direccion').value = emp.direccion;
}

function eliminarEmpleado(id) {
  if (confirm('¿Eliminar este empleado?')) {
    fetch(`${API_URL}/empleados/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(() => obtenerEmpleados());
  }
}

function buscar() {
  const nombre = document.getElementById('nombreBuscar').value;
  const url = nombre ? `${API_URL}/empleados?nombre=${nombre}` : `${API_URL}/empleados`;
  fetch(url, { headers: getHeaders() })
    .then(res => res.json())
    .then(data => mostrarEmpleados(data));
}

function limpiarFormulario() {
  document.getElementById('idEmpleado').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('apellidos').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('direccion').value = '';
}
