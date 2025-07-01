import { registrarPelicula } from '../services/api.js';

export function RegistrarPeliculas() {
  // Renderiza el formulario
  setTimeout(() => {
    const form = document.getElementById('formNuevaPelicula');
    if (form && !form.dataset.listener) {
      form.dataset.listener = "true";
      form.onsubmit = async function(e) {
        e.preventDefault();
        const data = {
          titulo: document.getElementById('titulo').value.trim(),
          genero: document.getElementById('genero').value.trim(), // String, no array
          duracion: Number(document.getElementById('duracion').value),
          clasificacion: document.getElementById('clasificacion').value.trim(),
          sinopsis: document.getElementById('sinopsis').value.trim(),
          fechaEstreno: document.getElementById('fechaEstreno').value, // String en formato YYYY-MM-DD
          director: document.getElementById('director').value.trim(),
          actoresPrincipales: document.getElementById('actoresPrincipales').value
            .split(',')
            .map(a => a.trim())
            .filter(a => a.length > 0),
          imagen: document.getElementById('imagen').value.trim(),
          carteleraActiva: true
        };
        // Validación básica
        if (
          !data.titulo ||
          !data.genero ||
          !data.duracion ||
          !data.clasificacion ||
          !data.sinopsis ||
          !data.fechaEstreno ||
          !data.director ||
          !data.actoresPrincipales.length ||
          !data.imagen
        ) {
          document.getElementById('mensajePelicula').innerText = 'Completa todos los campos';
          return;
        }
        // Enviar al backend
        const respuesta = await registrarPelicula(data);
        if (respuesta && !respuesta.error && respuesta._id) {
          document.getElementById('mensajePelicula').innerText = 'Película registrada correctamente';
          form.reset();
        } else {
          document.getElementById('mensajePelicula').innerText = respuesta.error || 'Error al registrar la película';
        }
      };
    }
  }, 0);

  return `
    <h2>Registrar Nueva Película</h2>
    <form id="formNuevaPelicula">
      <input type="text" id="titulo" placeholder="Título" required>
      <input type="text" id="genero" placeholder="Género" required>
      <input type="number" id="duracion" placeholder="Duración (minutos)" required>
      <input type="text" id="clasificacion" placeholder="Clasificación" required>
      <input type="text" id="sinopsis" placeholder="Sinopsis" required>
      <input type="date" id="fechaEstreno" placeholder="Fecha de estreno" required>
      <input type="text" id="director" placeholder="Director" required>
      <input type="text" id="actoresPrincipales" placeholder="Actores principales (separados por coma)" required>
      <input type="text" id="imagen" placeholder="Ruta de imagen (ej: assests/img/mi_pelicula.jpg)" required>
      <button type="submit">Registrar</button>
    </form>
    <div id="mensajePelicula"></div>
  `;
}