import { html } from 'lit-html';
export function LogoutButton() {
  return html`<button @click="${window.handleLogout}">Cerrar Sesión</button>`;
}
window.handleLogout = () => {
  sessionStorage.clear();
  window.location.hash = '#login';
};