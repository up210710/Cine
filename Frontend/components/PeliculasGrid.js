import { PeliculaCard } from './PeliculaCard.js';

export function PeliculasGrid({ peliculas, onComprar }) {
  return `
    <div class="peliculas-grid">
      ${peliculas.map(p => PeliculaCard({ pelicula: p, onComprar })).join('')}
    </div>
  `;
}