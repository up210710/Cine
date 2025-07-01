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
export function HorariosSelector({ horarios, onSeleccionar }) {
  return `
    <div class="horarios-selector">
      <h3>Selecciona un horario</h3>
      <ul class="horarios-list">
        ${horarios.map(h => `<li><button onclick="${onSeleccionar}('${h}')">${h}</button></li>`).join('')}
      </ul>
    </div>
  `;
}
