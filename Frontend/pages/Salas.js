import { AsientosSelector } from '../components/AsientosSelector.js';
import { registrarVenta, getVentas, getPeliculas } from '../services/api.js';

export async function Salas() {
  // Validación de sesión
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  if (!usuario) {
    alert('Debes iniciar sesión para comprar boletos.');
    window.location.hash = '#login';
    return '';
  }

  const peliculaId = sessionStorage.getItem('peliculaSeleccionada');
  const peliculas = await getPeliculas();
  const pelicula = peliculas.find(p => p._id === peliculaId);

  if (!pelicula) {
    return `<h2>Película no encontrada</h2>`;
  }

  const horarios = ['12:00 PM', '3:00 PM', '6:00 PM', '9:00 PM'];
  let horarioSeleccionado = horarios[0];

  const ventas = await getVentas();
  const ocupados = ventas
    .filter(v => v.pelicula._id === peliculaId && v.horario === horarioSeleccionado)
    .map(v => ({ fila: v.fila, numero: v.numero }));

  let asientosSeleccionados = [];
  window.onAsientoSelect = (fila, numero, reservado) => {
    if (reservado) {
      asientosSeleccionados.push({ fila, numero });
    } else {
      asientosSeleccionados = asientosSeleccionados.filter(a => !(a.fila === fila && a.numero === numero));
    }
  };

  const precioBase = 75;
  const precioFinal = usuario.membresia ? precioBase * 0.8 : precioBase;

  window.comprarBoletos = async () => {
    if (!asientosSeleccionados.length) {
      alert('Selecciona al menos un asiento');
      return;
    }
    const horario = document.getElementById('horarioSelect').value;
    const boletos = [];
    for (const asiento of asientosSeleccionados) {
      const venta = await registrarVenta({
        usuario: usuario._id,
        pelicula: pelicula._id,
        sala: 1,
        horario,
        fila: asiento.fila,
        numero: asiento.numero,
        membresia: usuario.membresia,
        precio: precioFinal
      });
      boletos.push({
        ...venta,
        peliculaTitulo: pelicula.titulo,
        sala: 1,
        horario,
        fila: asiento.fila,
        numero: asiento.numero,
        precio: precioFinal
      });
    }
    sessionStorage.setItem('ultimoBoleto', JSON.stringify({
      boletos,
      pelicula: {
        titulo: pelicula.titulo,
        imagen: pelicula.imagen
      },
      horario,
      sala: 1,
      precioTotal: boletos.length * precioFinal
    }));
    alert('¡Compra realizada!');
    window.location.hash = '#ticket';
  };

  return `
    <h2>Selecciona Sala y Asientos</h2>
    <div>
      <label>Horario:</label>
      <select id="horarioSelect">
        ${horarios.map(h => `<option value="${h}">${h}</option>`).join('')}
      </select>
    </div>
    <div id="asientosContainer">
      ${AsientosSelector({ ocupados, onSelect: window.onAsientoSelect })}
    </div>
    <button id="btnComprar" onclick="window.comprarBoletos && window.comprarBoletos()">Comprar Boleto</button>
  `;
}