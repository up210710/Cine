export function PeliculaCard({ pelicula, onComprar }) {
  return `
    <div class="pelicula-card mejorada">
      <div class="pelicula-img-wrap">
        <img src="${pelicula.imagen || 'assests/img/default.jpg'}" alt="${pelicula.titulo}">
        <div class="pelicula-overlay">
          <button onclick="window.comprarEstreno && window.comprarEstreno('${pelicula._id}')">Comprar Boleto</button>
        </div>
      </div>
      <div class="pelicula-info">
        <h4>${pelicula.titulo}</h4>
        <span class="categoria">${pelicula.genero}</span>
        <div class="pelicula-rating">
          <span>⭐ 4.5/5</span>
        </div>
      </div>
    </div>
  `;
}