const API_URL = import.meta.env.VITE_API_URL;

export async function getPeliculas() {
  const res = await fetch(`${API_URL}/peliculas`);
  return res.json();
}

export async function registrarVenta(venta) {
  const res = await fetch(`${API_URL}/ventas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(venta)
  });
  return res.json();
}

export async function getVentas() {
  const res = await fetch(`${API_URL}/ventas`);
  return res.json();   
}

export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function registrarUsuario(usuario) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario)
  });
  return res.json();
}

export async function getUsuarioPorNombre(nombre) {
  const usuarios = await getUsuarios();
  return usuarios.find(u => u.nombre === nombre);
}

export async function getEmpleados() {
  const res = await fetch(`${API_URL}/empleados`);
  return res.json();
}

// Cambia aquí para usar el resumen correcto
export async function getEstadisticas() {
  const res = await fetch(`${API_URL}/ventas/resumen`);
  return res.json();
}

export async function registrarPelicula(pelicula) {
  const res = await fetch(`${API_URL}/peliculas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(pelicula)
  });
  return res.json();
}