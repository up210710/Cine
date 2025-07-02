import { getEmpleados, getEstadisticas } from '../services/api.js';

export async function AdminEstadisticasRender(targetId = 'panelAdmin') {
  const resumen = await getEstadisticas();
  const empleados = await getEmpleados();

  if (!resumen || typeof resumen !== 'object') {
    document.getElementById(targetId).innerHTML = `<h2 style="color:#ff3c3c;">Error al cargar estadísticas del sistema</h2>`;
    return;
  }

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

  const ventasTabla = Array.isArray(resumen.ventasRecientes) && resumen.ventasRecientes.length
    ? `
      <h3>Ventas Recientes</h3>
      <div style="overflow-x:auto;">
        <table id="tabla-ventas-recientes">
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
            ${resumen.ventasRecientes.map((v, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${new Date(v.fecha).toLocaleString()}</td>
                <td>${v.usuario}</td>
                <td>${v.email}</td>
                <td>${v.pelicula}</td>
                <td>${v.sala}</td>
                <td>${v.horario}</td>
                <td>${v.asiento}</td>
                <td>$${v.precio.toFixed(2)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`
    : `<p style="color:#ff9800;">No hay ventas registradas aún.</p>`;

  const estadisticasGenerales = `
    <div class="estadisticas-container">
      <div class="estadistica-item"><h3>Total Ventas</h3><p>${resumen.totalVentas ?? 'Sin datos'}</p></div>
      <div class="estadistica-item"><h3>Clientes Atendidos</h3><p>${resumen.clientesAtendidos ?? 'Sin datos'}</p></div>
      <div class="estadistica-item"><h3>Ventas con Membresía</h3><p>${resumen.totalVentasConMembresia ?? 'Sin datos'}</p></div>
      <div class="estadistica-item"><h3>Ventas sin Membresía</h3><p>${resumen.totalVentasSinMembresia ?? 'Sin datos'}</p></div>
    </div>`;

  const estadisticasPeliculas = `
    <div class="estadisticas-container">
      <div class="estadistica-item">
        <h3>Boletos por Película</h3>
        <ul>
          ${(resumen.boletosPorPelicula && resumen.boletosPorPelicula.length > 0
            ? resumen.boletosPorPelicula.map(p => `<li>${p.pelicula}: ${p.cantidad}</li>`).join('')
            : '<li>Sin datos</li>')}
        </ul>
      </div>
      <div class="estadistica-item">
        <h3>Boletos por Sala</h3>
        <ul>
          ${(resumen.boletosPorSala && Object.keys(resumen.boletosPorSala).length > 0
            ? Object.entries(resumen.boletosPorSala).map(([sala, cantidad]) => `<li>Sala ${sala}: ${cantidad}</li>`).join('')
            : '<li>Sin datos</li>')}
        </ul>
      </div>
      <div class="estadistica-item"><h3>Más Vendida</h3><p>${resumen.masVendida || 'N/A'}</p></div>
      <div class="estadistica-item"><h3>Menos Vendida</h3><p>${resumen.menosVendida || 'N/A'}</p></div>
    </div>`;

  const listaEmpleados = `
    <h3>Empleados Registrados</h3>
    <ul id="empleadosLista">
      ${empleados.map(e => `<li>${e.nombre} (${e.usuario || e.email || '—'})</li>`).join('')}
    </ul>`;

  const tablaUsuarios = (usuarios, tipo) => `
    <h3>Compras por Usuario (${tipo})</h3>
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
        ${usuarios.map(u => `
          <tr>
            <td>${u.nombre}</td>
            <td>${u.email}</td>
            <td>$${u.totalGastado.toFixed(2)}</td>
            <td>${u.cantidadCompras}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;

  // Renderizado final en el DOM
  document.getElementById(targetId).innerHTML = `
    <section id="panelAdmin">
      <h2>Panel de Administración</h2>
      ${estadisticasGenerales}
      ${estadisticasPeliculas}
      ${listaEmpleados}
      ${tablaUsuarios(usuariosConMembresia, 'Con Membresía')}
      ${tablaUsuarios(usuariosSinMembresia, 'Sin Membresía')}
      ${ventasTabla}
    </section>`;

  // Inicializar eventos después del render
  const empleadosLista = document.getElementById('empleadosLista');
  if (empleadosLista) {
    empleadosLista.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        alert(`Empleado seleccionado: ${e.target.textContent}`);
      }
    });
  }
}

// Compatibilidad: función original para SSR o string
export async function AdminEstadisticas() {
  return `<div id="panelAdmin"></div>`;
}
