import { registrarUsuario, getUsuarios } from '../services/api.js';

export function Register() {
  return `
    <h2>Registro</h2>
    <input type="text" id="nuevoNombre" placeholder="Nombre">
    <input type="text" id="nuevoApellido" placeholder="Apellido">
    <input type="email" id="nuevoEmail" placeholder="Email">
    <input type="text" id="nuevoTelefono" placeholder="Teléfono">
    <input type="date" id="nuevaFechaNacimiento" placeholder="Fecha de nacimiento">
    <select id="nuevoGenero">
      <option value="Masculino">Masculino</option>
      <option value="Femenino">Femenino</option>
      <option value="Otro">Otro</option>
    </select>
    <input type="password" id="nuevaContrasena" placeholder="Contraseña">
    <select id="nuevoRol">
      <option value="usuario">Usuario normal</option>
      <option value="empleado">Empleado</option>
      <option value="admin">Administrador</option>
    </select>
    <button onclick="window.handleRegister()">Registrar</button>
    <button onclick="window.location.hash='#login'">Ya tengo cuenta</button>
  `;
}

window.handleRegister = async () => {
  const nombre = document.getElementById('nuevoNombre').value;
  const apellido = document.getElementById('nuevoApellido').value;
  const email = document.getElementById('nuevoEmail').value;
  const telefono = document.getElementById('nuevoTelefono').value;
  const fechaNacimiento = document.getElementById('nuevaFechaNacimiento').value;
  const genero = document.getElementById('nuevoGenero').value;
  const contrasena = document.getElementById('nuevaContrasena').value;
  const rol = document.getElementById('nuevoRol').value;

  if (!nombre || !apellido || !email || !telefono || !fechaNacimiento || !genero || !contrasena) {
    alert('Completa todos los campos');
    return;
  }

  // Verifica si el usuario ya existe
  const usuarios = await getUsuarios();
  if (usuarios.find(u => u.email === email)) {
    alert('Ya existe un usuario con ese email');
    return;
  }

  // Envía el registro al backend
  await registrarUsuario({
    nombre,
    apellido,
    email,
    telefono,
    fechaNacimiento,
    genero,
    membresia: false,
    contrasena, // Debes agregar este campo en el modelo si quieres autenticar por contraseña
    rol
  });

  alert('Registro exitoso. Ahora inicia sesión.');
  window.location.hash = '#login';
};