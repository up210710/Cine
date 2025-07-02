const Venta = require('../models/ventas');
const Usuario = require('../models/usuarios');
const Pelicula = require('../models/peliculas');

const obtenerEstadisticas = async (req, res) => {
  try {
    // Obtener todas las ventas
    const ventas = await Venta.find({});
    // Total de ventas realizadas
    const totalVentas = ventas.length;
    // Número de clientes atendidos (usuarios únicos en ventas)
    const clientesAtendidos = new Set(ventas.map(v => v.usuario.toString())).size;
    // Obtener todos los usuarios
    const usuarios = await Usuario.find({});
    // Total de ventas a clientes con membresía
    const usuariosConMembresia = usuarios.filter(u => u.membresia === true).map(u => u._id.toString());
    const totalVentasConMembresia = ventas.filter(v => usuariosConMembresia.includes(v.usuario.toString())).length;
    // Total de ventas a clientes sin membresía
    const usuariosSinMembresia = usuarios.filter(u => !u.membresia).map(u => u._id.toString());
    const totalVentasSinMembresia = ventas.filter(v => usuariosSinMembresia.includes(v.usuario.toString())).length;
    // Total de boletos vendidos por película
    const boletosPorPelicula = {};
    ventas.forEach(v => {
      const key = v.pelicula.toString();
      boletosPorPelicula[key] = (boletosPorPelicula[key] || 0) + 1;
    });
    // Total de boletos vendidos por sala
    const boletosPorSala = {};
    ventas.forEach(v => {
      const key = v.sala.toString();
      boletosPorSala[key] = (boletosPorSala[key] || 0) + 1;
    });
    // Película más vendida y menos vendida
    let masVendida = null, menosVendida = null;
    let max = -Infinity, min = Infinity;
    for (const [peliculaId, cantidad] of Object.entries(boletosPorPelicula)) {
      if (cantidad > max) {
        max = cantidad;
        masVendida = peliculaId;
      }
      if (cantidad < min) {
        min = cantidad;
        menosVendida = peliculaId;
      }
    }
    // Obtener nombres de películas
    const peliculas = await Pelicula.find({});
    const peliculasMap = {};
    peliculas.forEach(p => { peliculasMap[p._id.toString()] = p.titulo; });
    res.json({
      totalVentas,
      clientesAtendidos,
      totalVentasConMembresia,
      totalVentasSinMembresia,
      boletosPorPelicula: Object.entries(boletosPorPelicula).map(([id, cantidad]) => ({ pelicula: peliculasMap[id] || id, cantidad })),
      boletosPorSala,
      masVendida: masVendida ? peliculasMap[masVendida] : null,
      menosVendida: menosVendida ? peliculasMap[menosVendida] : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas', details: error.message });
  }
};

module.exports = { obtenerEstadisticas };
