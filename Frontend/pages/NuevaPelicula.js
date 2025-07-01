import { RegistrarPeliculas } from '../components/RegistrarPeliculas.js';

export function NuevaPeliculaPage() {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario || (usuario.rol !== 'empleado' && usuario.rol !== 'admin')) {
    window.location.hash = '#home';
    return `<h2>No autorizado</h2>`;
  }
  return RegistrarPeliculas();
}