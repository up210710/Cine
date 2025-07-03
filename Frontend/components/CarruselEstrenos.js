export function CarruselEstrenos({ estrenos, onComprar }) {
  let index = 0;
  let interval = null;

  function render() {
    const e = estrenos[index];
    return `
      <div class="estreno-card-carrusel">
        <button class="carrusel-arrow left" id="carrusel-arrow-left" title="Anterior">
          <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ff9800"/><polyline points="19,9 13,16 19,23" fill="none" stroke="#232946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="carrusel-img-box">
          <img src="${e.imagen}" alt="${e.titulo}" class="carrusel-img">
        </div>
        <div class="estreno-info-carrusel">
          <h3>${e.titulo}</h3>
          <span class="categoria">${e.genero}</span>
          <div class="pelicula-rating">
            <span>⭐ 4.5/5</span>
          </div>
          <p class="sinopsis">${e.sinopsis}</p>
          <p class="frase">${e.frase || ''}</p>
          <button class="btn-carrusel-comprar" onclick="window.comprarEstreno && window.comprarEstreno('${e._id}')">Comprar</button>
        </div>
        <button class="carrusel-arrow right" id="carrusel-arrow-right" title="Siguiente">
          <svg width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ff9800"/><polyline points="13,9 19,16 13,23" fill="none" stroke="#232946" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="carrusel-indicadores">
          ${estrenos.map((_, i) =>
            `<span class="carrusel-indicador${i === index ? ' activo' : ''}" data-indice="${i}"></span>`
          ).join('')}
        </div>
      </div>
    `;
  }

  function update() {
    const el = document.getElementById('estrenosLista');
    if (el) {
      el.innerHTML = render();
      // Asigna eventos SOLO una vez por render
      const left = document.getElementById('carrusel-arrow-left');
      const right = document.getElementById('carrusel-arrow-right');
      if (left) left.onclick = () => prev();
      if (right) right.onclick = () => next();
      document.querySelectorAll('.carrusel-indicador').forEach(ind => {
        ind.onclick = () => irA(Number(ind.dataset.indice));
      });
    }
  }

  function next() {
    index = (index + 1) % estrenos.length;
    update();
  }
  function prev() {
    index = (index - 1 + estrenos.length) % estrenos.length;
    update();
  }
  function irA(i) {
    index = i;
    update();
  }

  window.comprarEstreno = onComprar;

  if (interval) clearInterval(interval);
  interval = setInterval(next, 7000);

  // Estilos mejorados solo una vez
  if (!document.getElementById('carrusel-estrenos-styles')) {
    const style = document.createElement('style');
    style.id = 'carrusel-estrenos-styles';
    style.innerHTML = `
      .estreno-card-carrusel {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        background: #232946;
        border-radius: 28px;
        box-shadow: 0 8px 32px #000a;
        overflow: hidden;
        min-height: 420px;
        margin-bottom: 32px;
        animation: fadeInPanel 0.4s;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
      }
      .carrusel-img-box {
        flex: 0 0 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #181c2f;
      }
      .carrusel-img {
        width: 240px;
        height: 340px;
        object-fit: cover;
        border-radius: 18px;
        margin: 28px;
        box-shadow: 0 4px 18px #0008;
      }
      .estreno-info-carrusel {
        flex: 1 1 auto;
        padding: 38px 48px 32px 48px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .estreno-info-carrusel h3 {
        font-size: 2.3rem;
        color: #ff9800;
        margin-bottom: 10px;
      }
      .estreno-info-carrusel .categoria {
        background: #ff9800;
        color: #232946;
        border-radius: 8px;
        padding: 2px 16px;
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 14px;
        display: inline-block;
      }
      .estreno-info-carrusel .pelicula-rating {
        margin-bottom: 12px;
        font-size: 1.2rem;
      }
      .estreno-info-carrusel .sinopsis {
        font-size: 1.15rem;
        margin-bottom: 10px;
        color: #ffe066;
      }
      .estreno-info-carrusel .frase {
        font-style: italic;
        color: #ffd740;
        margin-bottom: 16px;
      }
      .btn-carrusel-comprar {
        background: linear-gradient(90deg, #ff9800, #ff3c3c);
        color: #fff;
        border: none;
        border-radius: 10px;
        padding: 12px 38px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 2px 8px #0006;
        margin-top: 18px;
        align-self: flex-start;
        transition: background 0.2s;
      }
      .btn-carrusel-comprar:hover {
        background: linear-gradient(90deg, #ff3c3c, #ff9800);
      }
      .carrusel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        cursor: pointer;
        z-index: 2;
        padding: 0;
        width: 54px;
        height: 54px;
        opacity: 0.92;
        transition: opacity 0.2s;
      }
      .carrusel-arrow.left { left: 0; }
      .carrusel-arrow.right { right: 0; }
      .carrusel-arrow svg {
        display: block;
        margin: auto;
        filter: drop-shadow(0 2px 8px #0008);
        transition: filter 0.2s;
      }
      .carrusel-arrow:hover svg circle {
        fill: #ffd740;
      }
      .carrusel-arrow:active svg circle {
        fill: #ff3c3c;
      }
      .carrusel-indicadores {
        position: absolute;
        bottom: 22px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 12px;
      }
      .carrusel-indicador {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffe066;
        opacity: 0.5;
        cursor: pointer;
        border: 2px solid #ff9800;
        transition: opacity 0.2s, background 0.2s;
      }
      .carrusel-indicador.activo {
        background: #ff9800;
        opacity: 1;
        border-color: #ffd740;
      }
      @media (max-width: 1000px) {
        .estreno-card-carrusel {
          flex-direction: column;
          min-height: 0;
          max-width: 98vw;
        }
        .carrusel-img-box {
          width: 100%;
          justify-content: center;
        }
        .carrusel-img {
          width: 180px;
          height: 260px;
          margin: 18px;
        }
        .estreno-info-carrusel {
          padding: 24px 16px 24px 16px;
        }
      }
      @keyframes fadeInPanel {
        from { opacity: 0; transform: scale(0.98);}
        to { opacity: 1; transform: scale(1);}
      }
    `;
    document.head.appendChild(style);
  }

  // Render inicial y asignación de eventos
  setTimeout(update, 0);

  return render();
}
