export function CarruselEstrenos({ estrenos, onComprar }) {
  let index = 0;
  let interval = null;

  function render() {
    const e = estrenos[index];
    return `
      <div class="estreno-card">
        <img src="${e.imagen}" alt="${e.titulo}">
        <div class="estreno-info">
          <h3>${e.titulo}</h3>
          <span class="categoria">${e.genero}</span>
          <div class="pelicula-rating">
            <span>⭐ 4.5/5</span>
          </div>
          <p class="sinopsis">${e.sinopsis}</p>
          <p class="frase">${e.frase || ''}</p>
          <button onclick="window.comprarEstreno && window.comprarEstreno('${e._id}')">Comprar</button>
        </div>
      </div>
    `;
  }

  function next() {
    index = (index + 1) % estrenos.length;
    const el = document.getElementById('estrenosLista');
    if (el) {
      el.innerHTML = render();
    }
  }
  function prev() {
    index = (index - 1 + estrenos.length) % estrenos.length;
    const el = document.getElementById('estrenosLista');
    if (el) {
      el.innerHTML = render();
    }
  }

  window.cambiarEstreno = dir => dir > 0 ? next() : prev();

  if (interval) clearInterval(interval);
  interval = setInterval(next, 5000);

  return render();
}
