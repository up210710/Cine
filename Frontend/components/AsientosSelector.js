export function AsientosSelector({ filas = ["A", "B", "C", "D"], ocupados = [], onSelect }) {
  let html = `<div class="asientos-horizontal">`;
  for (let fila of filas) {
    html += `<div class="fila-asientos"><span class="fila-label">Fila ${fila}</span>`;
    for (let i = 1; i <= 5; i++) {
      const ocupado = ocupados.find(a => a.fila === fila && a.numero == i);
      html += `<div class="asiento ${ocupado ? 'ocupado' : 'disponible'}" 
        data-fila="${fila}" data-numero="${i}" onclick="window.seleccionarAsiento && window.seleccionarAsiento('${fila}',${i},this)">
        <svg width="28" height="28" viewBox="0 0 28 28">
          <ellipse cx="14" cy="16" rx="12" ry="8" fill="currentColor"/>
          <rect x="6" y="20" width="16" height="5" rx="2" fill="currentColor"/>
        </svg>
        <span class="asiento-num">${i}</span>
      </div>`;
    }
    html += `</div>`;
  }
  html += `</div>`;
  // Exponer función global para selección
  window.seleccionarAsiento = (fila, numero, el) => {
    if (!el.classList.contains('ocupado')) {
      el.classList.toggle('reservado');
      if (onSelect) onSelect(fila, numero, el.classList.contains('reservado'));
    }
  };
  return html;
}