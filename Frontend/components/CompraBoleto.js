export function CompraBoleto({ pelicula, horarios, onComprar }) {
  return `
    <div class="compra-boleto">
      <h2>Compra Boleto para ${pelicula.titulo}</h2>
      <p>Fecha: ${pelicula.fecha}</p>
      <p>Duración: ${pelicula.duracion} minutos</p>
      <p>Género: ${pelicula.genero}</p>
      <h3>Horarios Disponibles</h3>
      <div class="horarios-list">
        ${horarios.map(h => `<button onclick="${onComprar}('${pelicula.id}', '${h}')">${h}</button>`).join('')}
      </div>
    </div>
  `;
}