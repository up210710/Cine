import { getEstadisticas } from '../services/api.js';

export async function AdminEstadisticasRender(targetId = 'panelAdmin') {
  const resumen = await getEstadisticas();

  if (!resumen || typeof resumen !== 'object') {
    document.getElementById(targetId).innerHTML = `<h2 style="color:#ff3c3c;">Error al cargar estadísticas del sistema</h2>`;
    return;
  }

  // Clasificación de usuarios por membresía
  const usuariosConMembresia = [];
  const usuariosSinMembresia = [];
  if (resumen.ventasPorUsuario) {
    for (const uid in resumen.ventasPorUsuario) {
      const user = resumen.ventasPorUsuario[uid];
      if (user.membresia && user.membresia.toString().toLowerCase() === 'sí') {
        usuariosConMembresia.push(user);
      } else {
        usuariosSinMembresia.push(user);
      }
    }
  }

  // Estilos visuales y responsivos + iconos
  if (!document.getElementById('admin-estadisticas-extra-styles')) {
    const style = document.createElement('style');
    style.id = 'admin-estadisticas-extra-styles';
    style.innerHTML = `
      .estadisticas-container {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin: 32px 0 24px 0;
        justify-content: center;
      }
      .estadistica-item {
        background: rgba(30,30,30,0.95);
        border-radius: 16px;
        box-shadow: 0 2px 12px #0008;
        padding: 24px 32px;
        min-width: 180px;
        min-height: 90px;
        text-align: center;
        flex: 1 1 180px;
        max-width: 260px;
        margin-bottom: 12px;
        border: 2px solid #ff9800;
        transition: box-shadow 0.2s, border 0.2s;
        position: relative;
      }
      .estadistica-item .icono {
        font-size: 2.2rem;
        margin-bottom: 8px;
        display: block;
      }
      .estadistica-item:hover {
        box-shadow: 0 4px 24px #0008;
        border-color: #ffcc00;
      }
      h2 {
        text-align: center;
        color: #ff9800;
        margin-bottom: 24px;
        font-size: 28px;
      }
      h3 {
        color: #ffd740;
        font-size: 22px;
        margin-bottom: 16px;
        text-align: center;
      }
      .panel-seccion {
        margin-bottom: 18px;
        border-radius: 10px;
        background: #232946;
        box-shadow: 0 2px 8px #0004;
        overflow: hidden;
      }
      .panel-toggle-btn {
        background: #ff9800;
        color: #232946;
        border: none;
        border-radius: 0;
        padding: 14px 18px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        width: 100%;
        text-align: left;
        outline: none;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .panel-toggle-btn:hover {
        background: #ffd740;
        color: #222;
      }
      .panel-content {
        background: #232946;
        padding: 18px 24px;
        display: none;
        font-size: 1rem;
        animation: fadeInPanel 0.3s;
      }
      .badge {
        display: inline-block;
        background: #ff9800;
        color: #222;
        border-radius: 8px;
        padding: 2px 10px;
        font-size: 1.05rem;
        font-weight: bold;
        margin-left: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        background: #232946;
        color: #fff;
        border-radius: 8px;
        overflow: hidden;
      }
      th, td {
        border: 1px solid #444;
        padding: 6px 10px;
        text-align: left;
      }
      th {
        background: #ff9800;
        color: #222;
      }
      tr:hover {
        background: rgba(255, 152, 0, 0.08);
      }
      ul {
        padding-left: 18px;
      }
      .salas-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        margin-top: 16px;
        justify-content: flex-start;
      }
      .sala-card {
        background: #232946;
        border-radius: 12px;
        box-shadow: 0 2px 8px #0004;
        padding: 18px 24px;
        min-width: 220px;
        margin-bottom: 12px;
        border: 2px solid #ff9800;
        transition: box-shadow 0.2s, border 0.2s;
      }
      .sala-card h4 {
        color: #ff9800;
        margin-bottom: 10px;
        font-size: 1.1rem;
      }
      .sala-card ul {
        margin: 0;
        padding-left: 18px;
      }
      @media (max-width: 900px) {
        .estadisticas-container {
          flex-direction: column;
          align-items: stretch;
        }
        .estadistica-item {
          max-width: 100%;
        }
        .salas-grid {
          flex-direction: column;
        }
      }
      @keyframes fadeInPanel {
        from { opacity: 0; transform: scale(0.98);}
        to { opacity: 1; transform: scale(1);}
      }
    `;
    document.head.appendChild(style);
  }

  // Panel de contadores principales con iconos
  const estadisticasGenerales = `
    <div class="estadisticas-container">
      <div class="estadistica-item">
        <span class="icono">🧾</span>
        <div>Total Ventas</div>
        <p>${resumen.totalVentas ?? 'Sin datos'}</p>
      </div>
      <div class="estadistica-item">
        <span class="icono">👥</span>
        <div>Clientes Atendidos</div>
        <p>${resumen.clientesAtendidos ?? 'Sin datos'}</p>
      </div>
      <div class="estadistica-item">
        <span class="icono">⭐</span>
        <div>Ventas con Membresía</div>
        <p>${resumen.totalVentasConMembresia ?? 'Sin datos'}</p>
      </div>
      <div class="estadistica-item">
        <span class="icono">👤</span>
        <div>Ventas sin Membresía</div>
        <p>${resumen.totalVentasSinMembresia ?? 'Sin datos'}</p>
      </div>
      <div class="estadistica-item">
        <span class="icono">🎬</span>
        <div>Más Vendida</div>
        <p>${resumen.masVendida || 'Sin datos'}</p>
      </div>
      <div class="estadistica-item">
        <span class="icono">🎟️</span>
        <div>Menos Vendida</div>
        <p>${resumen.menosVendida || 'Sin datos'}</p>
      </div>
    </div>`;

  // Cada película es una sala: muestra una tarjeta por película con sus datos
  let salasPorPelicula = '';
  if (Array.isArray(resumen.boletosPorPelicula) && resumen.boletosPorPelicula.length > 0) {
    salasPorPelicula = `
      <div class="salas-grid">
        ${resumen.boletosPorPelicula.map((p, idx) => `
          <div class="sala-card">
            <h4>Sala ${idx + 1} - ${p.pelicula}</h4>
            <ul>
              <li>Boletos vendidos: <span class="badge">${p.cantidad}</span></li>
            </ul>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    salasPorPelicula = `<div style="margin:16px 0;">No hay datos de salas/películas.</div>`;
  }

  // Panel expandible interactivo
  const panelExpandible = `
    <div class="panel-seccion">
      <button class="panel-toggle-btn" data-target="sec-salas-peliculas">🎬 Salas (por Película)</button>
      <div class="panel-content" id="sec-salas-peliculas">
        ${salasPorPelicula}
      </div>
    </div>
    <div class="panel-seccion">
      <button class="panel-toggle-btn" data-target="sec-usuarios-membresia">⭐ Compras por Usuario (Con Membresía)</button>
      <div class="panel-content" id="sec-usuarios-membresia">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Total Gastado</th>
              <th>Cantidad de Compras</th>
            </tr>
          </thead>
          <tbody>
            ${usuariosConMembresia.length ? usuariosConMembresia.map(u => `
              <tr>
                <td>${u.nombre || ''}</td>
                <td>${u.email || ''}</td>
                <td>$${u.totalGastado !== undefined ? u.totalGastado.toFixed(2) : 'Sin datos'}</td>
                <td>${u.cantidadCompras ?? 'Sin datos'}</td>
              </tr>`).join('') : `<tr><td colspan="4">Sin datos</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel-seccion">
      <button class="panel-toggle-btn" data-target="sec-usuarios-sinmembresia">👤 Compras por Usuario (Sin Membresía)</button>
      <div class="panel-content" id="sec-usuarios-sinmembresia">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Total Gastado</th>
              <th>Cantidad de Compras</th>
            </tr>
          </thead>
          <tbody>
            ${usuariosSinMembresia.length ? usuariosSinMembresia.map(u => `
              <tr>
                <td>${u.nombre || ''}</td>
                <td>${u.email || ''}</td>
                <td>$${u.totalGastado !== undefined ? u.totalGastado.toFixed(2) : 'Sin datos'}</td>
                <td>${u.cantidadCompras ?? 'Sin datos'}</td>
              </tr>`).join('') : `<tr><td colspan="4">Sin datos</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
    <div class="panel-seccion">
      <button class="panel-toggle-btn" data-target="sec-ventas-recientes">🧾 Ventas Recientes</button>
      <div class="panel-content" id="sec-ventas-recientes">
        ${Array.isArray(resumen.VentasRecientes) && resumen.VentasRecientes.length
      ? `
            <div style="overflow-x:auto;">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Película</th>
                    <th>Sala</th>
                    <th>Horario</th>
                    <th>Asiento</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${resumen.VentasRecientes.map((v, i) => `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${v.fecha ? new Date(v.fecha).toLocaleString() : 'Sin datos'}</td>
                      <td>${v.usuario || 'Sin datos'}</td>
                      <td>${v.email || 'Sin datos'}</td>
                      <td>${v.pelicula || 'Sin datos'}</td>
                      <td>${v.sala || 'Sin datos'}</td>
                      <td>${v.horario || 'Sin datos'}</td>
                      <td>${v.asiento || 'Sin datos'}</td>
                      <td>$${v.precio !== undefined ? Number(v.precio).toFixed(2) : 'Sin datos'}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>`
      : `<p style="color:#ff9800;">No hay ventas registradas aún.</p>`}
      </div>
    </div>
  `;

  // Renderizado final en el DOM
  document.getElementById(targetId).innerHTML = `
    <section id="panelAdmin">
      <h2>Panel de Administración</h2>
      ${estadisticasGenerales}
      ${panelExpandible}
    </section>`;

  // Interactividad: secciones expandibles
  setTimeout(() => {
    document.querySelectorAll('.panel-toggle-btn').forEach(btn => {
      btn.onclick = () => {
        const target = document.getElementById(btn.dataset.target);
        if (target) {
          target.style.display = (target.style.display === 'none' || !target.style.display) ? 'block' : 'none';
        }
      };
    });
    // Por defecto, abre la primera sección
    const firstContent = document.querySelector('.panel-content');
    if (firstContent) firstContent.style.display = 'block';
  }, 0);
}

// Compatibilidad: función original para SSR o string
export async function AdminEstadisticas() {
  return `<div id="panelAdmin"></div>`;
}
