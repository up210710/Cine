// filepath: Frontend/components/Login.js
import { getUsuarios } from '../services/api.js';
export function Login() {
  return `
    <h2>Iniciar Sesión</h2>
    <input type="email" id="usuarioEmail" placeholder="Email">
    <input type="password" id="contrasena" placeholder="Contraseña">
    <button onclick="window.handleLogin()">Iniciar Sesión</button>
    <button onclick="window.location.hash='#register'">Crear Cuenta</button>
  `;
}
window.handleLogin = async () => {
  const email = document.getElementById('usuarioEmail').value;
  const contrasena = document.getElementById('contrasena').value;
  if (!email || !contrasena) {
    alert('Completa todos los campos');
    return;
  }
  const usuarios = await getUsuarios();
  const user = usuarios.find(u => u.email === email && u.contrasena === contrasena);
  if (!user) {
    alert('Usuario o contraseña incorrectos');
    return;
  }
  sessionStorage.setItem('usuario', JSON.stringify(user));
  window.location.hash = '#home';
};