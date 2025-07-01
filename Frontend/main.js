import { Home } from './pages/Home.js';
import { Salas } from './pages/Salas.js';
import { LoginPage } from './pages/Login.js';
import { RegisterPage } from './pages/Register.js';
import { TicketPage } from './pages/Ticket.js';
import { NuevaPeliculaPage } from './pages/NuevaPelicula.js';
import { Navbar } from './components/Navbar.js';
import { AdminPage } from './pages/Admin.js';

async function render() {
  let page;
  switch (window.location.hash) {
    case '#salas':
      page = await Salas();
      break;
    case '#admin':
      page = await AdminPage();
      break;
    case '#login':
      page = LoginPage();
      break;
    case '#register':
      page = RegisterPage();
      break;
    case '#ticket':
      page = TicketPage();
      break;
    case '#nueva-pelicula':
      page = NuevaPeliculaPage();
      break;
    default:
      page = await Home();
  }
  document.getElementById('root').innerHTML = Navbar() + page;
}

window.addEventListener('DOMContentLoaded', render);
window.addEventListener('hashchange', render);
