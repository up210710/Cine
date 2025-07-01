import { getEmpleados } from '../services/api.js';

export async function RegistroEmpleado() {
  const empleados = await getEmpleados();
  return `
    <h3>Registrar Empleado</h3>
    <input type="text" id="nombreEmpleado" placeholder="Nombre del empleado">
    <input type="text" id="usuarioEmpleado" placeholder="Usuario">
    <input type="password" id="passEmpleado" placeholder="Contraseña">
    <button onclick="window.handleRegistrarEmpleado()">Registrar Empleado</button>
    <div id="empleadosLista" style="margin-top:18px;">
      <ul>
        ${empleados.map(e => `<li>${e.nombre} (${e.usuario})</li>`).join('')}
      </ul>
    </div>
  `;
}
window.handleRegistrarEmpleado = () => {
  alert('Funcionalidad de registro de empleado pendiente de implementar');
};