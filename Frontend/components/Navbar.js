export function Navbar() {
  let usuario = null;
  try {
    usuario = JSON.parse(sessionStorage.getItem('usuario'));
  } catch (e) {
    usuario = null;
  }
  let menu = '';

  if (usuario) {
    menu = `
      <li><a href="#home">Películas en estreno</a></li>
      <li><a href="#promos">Promociones</a></li>
      ${(usuario.rol === 'empleado' || usuario.rol === 'admin') ? `<li><a href="#nueva-pelicula">Registrar Película</a></li>` : ''}
      ${usuario.rol === 'admin' ? `<li><a href="#admin">Admin Estadísticas</a></li>` : ''}
      <li>
        <span class="navbar-user">
          <span title="Usuario: ${usuario.nombre} (${usuario.rol})">👤 ${usuario.nombre} (${usuario.rol})</span>
          <span style="color:#ffe066;font-weight:bold;margin-left:8px;">
            Membresía activa: ${usuario.membresia ? 'true' : 'false'}
          </span>
          <a href="#logout" id="logout-button" title="Cerrar sesión">⎋</a>
        </span>
      </li>
    `;
    // Botón de membresía si no la tiene
    if (!usuario.membresia) {
      menu += `
        <li>
          <button id="btnMembresia" style="background:linear-gradient(90deg,#ff9800,#ff3c3c);color:#fff;font-weight:bold;border:none;border-radius:8px;padding:8px 18px;cursor:pointer;">
            Activar Membresía (Descuento 20%)
          </button>
        </li>
      `;
      setTimeout(() => {
        const btn = document.getElementById('btnMembresia');
        if (btn) {
          btn.onclick = async () => {
            try {
              const res = await fetch(`/api/usuarios/${usuario._id}/membresia`, { method: 'POST' });
              if (res.ok) {
                const actualizado = await res.json();
                sessionStorage.setItem('usuario', JSON.stringify(actualizado));
                alert('¡Membresía activada! Ahora tienes descuento.');
                window.location.reload();
              } else {
                const error = await res.json();
                alert(error.error || 'No se pudo activar la membresía');
              }
            } catch (err) {
              alert('Error de conexión al activar membresía');
            }
          };
        }
      }, 0);
    }
  } else {
    menu = `
      <li><a href="#home">Películas en estreno</a></li>
      <li><a href="#promos">Promociones</a></li>
      <li><a href="#login">Iniciar Sesión</a></li>
      <li><a href="#register">Registro</a></li>
    `;
  }

  return `
    <nav class="navbar-modern">
      <div class="navbar-brand">
        <img src="assests/icons/cinepolis.ico" alt="CineApp Logo" style="height:32px;vertical-align:middle;margin-right:8px;">
        <a href="#home" style="color:#ffe066;font-size:2rem;font-weight:bold;vertical-align:middle;text-decoration:none;">CineApp</a>
      </div>
      <ul class="navbar-menu">
        ${menu}
      </ul>
    </nav>
  `;
}

// Cerrar sesión
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'logout-button') {
    sessionStorage.clear();
    window.location.hash = '#login';
  }
});
