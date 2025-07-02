import { AdminEstadisticas, AdminEstadisticasRender } from '../components/AdminEstadisticas.js';

export async function AdminPage() {
  // Solo permite acceso a admin
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario || usuario.rol !== 'admin') {
    window.location.hash = '#home';
    return `<h2>No autorizado</h2>`;
  }
  // Renderiza el contenedor y luego los datos
  setTimeout(() => AdminEstadisticasRender('panelAdmin'), 0);
  return `<div id="panelAdmin"></div>`;
}