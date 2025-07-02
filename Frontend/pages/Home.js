import { getPeliculas } from '../services/api.js';
import { PeliculaCard } from '../components/PeliculaCard.js';
import { CarruselEstrenos } from '../components/CarruselEstrenos.js';

export async function Home() {
  const peliculas = await getPeliculas();
  const estrenos = peliculas.slice(0, 3);
  const cartelera = peliculas.slice(3);

  let html = `
    <section style="margin: 40px auto 0 auto; max-width: 900px; text-align: center;">
      <h1 style="font-size:2.5rem; color:#ffe066; font-weight:bold; letter-spacing:2px; margin-bottom:10px;">
        ¡Bienvenido a CineApp!
      </h1>
      <p style="font-size:1.2rem; color:#fff; margin-bottom:30px;">
        Disfruta de los mejores estrenos y la cartelera más completa.<br>
        Compra tus boletos en línea y vive la experiencia del cine.
      </p>
    </section>
    <section class="carrusel-estrenos-horizontal">
      <button class="carrusel-btn" onclick="cambiarEstreno(-1)">&#8592;</button>
      <div id="estrenosLista" class="estrenos-lista">${CarruselEstrenos({ estrenos, onComprar: window.comprarEstreno })}</div>
      <button class="carrusel-btn" onclick="cambiarEstreno(1)">&#8594;</button>
    </section>
    <section style="max-width:1100px; margin:40px auto 0 auto;">
      <h2 style="color:#ff9800; text-align:left; font-size:2rem; font-weight:bold; margin-bottom:18px;">
        Cartelera
      </h2>
      <div id="otrasPeliculas" class="peliculas-grid">
        ${cartelera.map(p => PeliculaCard({ pelicula: p, onComprar: window.comprarEstreno })).join('')}
      </div>
    </section>
  `;

  window.comprarEstreno = peliculaId => {
    sessionStorage.setItem('peliculaSeleccionada', peliculaId);
    window.location.hash = '#salas';
  };

  return html;
}