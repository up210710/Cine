export function Navbar() {
  const usuario = JSON.parse(sessionStorage.getItem('usuario'));
  let menu = '';

  if (usuario) {
    // Menú para usuarios logueados
    menu = `
      <li><a href="#home">Películas en estreno</a></li>
      <li><a href="#promos">Promociones</a></li>
      ${usuario.rol === 'empleado' || usuario.rol === 'admin' ? `<li><a href="#nueva-pelicula">Registrar Película</a></li>` : ''}
      ${usuario.rol === 'admin' ? `<li><a href="#admin">Admin Estadisticas</a></li>` : ''}
      <li>
        <span class="navbar-user">
          <span title="Usuario: ${usuario.nombre} (${usuario.rol})">👤 ${usuario.nombre} (${usuario.rol})</span>
          <a href="#logout" id="logout-button" title="Cerrar sesión">⎋</a>
        </span>
      </li>
    `;
  } else {
    // Menú para visitantes
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
        <a href="#home">
          <img src="assests/img/icons/CineApp_logo.png" alt="CineApp Logo" style="height:32px;vertical-align:middle;margin-right:8px;">
          CineApp
        </a>
      </div>
      <ul class="navbar-menu">
        ${menu}
      </ul>
    </nav>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'logout-button') {
    sessionStorage.clear();
    window.location.hash = '#login';
  }
});
