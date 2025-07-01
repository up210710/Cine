const Venta = require('../models/ventas');
const Usuario = require('../models/usuarios');
const Pelicula = require('../models/peliculas');
// Obtener todas las ventas
exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('usuario pelicula');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};  
// Registrar una nueva venta
exports.registrarVenta = async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar venta' });
  }
};
// Obtener venta por ID
exports.getVentaPorId = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id).populate('usuario pelicula');
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta' });
  }
};
// Actualizar venta
exports.actualizarVenta = async (req, res) => {
    try {
        const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('usuario pelicula');
        if (!ventaActualizada) return res.status(404).json({ error: 'Venta no encontrada' });
        res.json(ventaActualizada); 
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar venta' });
    }
};
// Eliminar venta
exports.eliminarVenta = async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
};
// Consulta general de ventas y clientes
exports.getResumenVentas = async (req, res) => {
  try {
    const ventas = await Venta.find().populate('usuario pelicula').sort({ createdAt: -1 });
    const ventasValidas = ventas.filter(
      v => v.usuario && v.usuario._id && v.pelicula && v.pelicula.titulo
    );

    if (!ventasValidas.length) {
      return res.json({
        totalVentas: 0,
        clientesAtendidos: 0,
        ventasMembresia: 0,
        ventasSinMembresia: 0,
        boletosPorPelicula: {},
        boletosPorSala: {},
        masVendida: null,
        menosVendida: null,
        ventasPorUsuario: {},
        ventasRecientes: []
      });
    }

    const totalVentas = ventasValidas.length;
    const clientesUnicos = new Set(ventasValidas.map(v => v.usuario._id.toString())).size;
    const ventasMembresia = ventasValidas.filter(v => v.usuario && v.usuario.membresia).length;
    const ventasSinMembresia = ventasValidas.filter(v => v.usuario && !v.usuario.membresia).length;

    // Boletos por película
    const boletosPorPelicula = {};
    ventasValidas.forEach(v => {
      const titulo = v.pelicula && v.pelicula.titulo;
      if (titulo) {
        boletosPorPelicula[titulo] = (boletosPorPelicula[titulo] || 0) + 1;
      }
    });

    // Boletos por sala
    const boletosPorSala = {};
    ventasValidas.forEach(v => {
      const sala = v.sala;
      if (sala) {
        boletosPorSala[sala] = (boletosPorSala[sala] || 0) + 1;
      }
    });

    // Película más y menos vendida
    let masVendida = null, menosVendida = null;
    let max = 0, min = Infinity;
    for (const [titulo, cantidad] of Object.entries(boletosPorPelicula)) {
      if (cantidad > max) { max = cantidad; masVendida = titulo; }
      if (cantidad < min) { min = cantidad; menosVendida = titulo; }
    }

    // Ventas por usuario (para tabla detallada)
    const ventasPorUsuario = {};
    ventasValidas.forEach(v => {
      if (!v.usuario) return;
      const uid = v.usuario._id.toString();
      if (!ventasPorUsuario[uid]) {
        ventasPorUsuario[uid] = {
          nombre: `${v.usuario.nombre} ${v.usuario.apellido}`,
          email: v.usuario.email,
          membresia: v.usuario.membresia ? 'Sí' : 'No',
          totalGastado: 0,
          cantidadCompras: 0
        };
      }
      ventasPorUsuario[uid].totalGastado += v.precio || 0;
      ventasPorUsuario[uid].cantidadCompras += 1;
    });

    // Ventas recientes (puedes limitar a las 20 más recientes)
    const ventasRecientes = ventasValidas.slice(0, 20).map(v => ({
      fecha: v.createdAt,
      usuario: v.usuario ? `${v.usuario.nombre} ${v.usuario.apellido}` : 'N/A',
      email: v.usuario ? v.usuario.email : 'N/A',
      pelicula: v.pelicula ? v.pelicula.titulo : 'N/A',
      sala: v.sala,
      horario: v.horario,
      asiento: `${v.fila}${v.numero}`,
      precio: v.precio
    }));

    res.json({
      totalVentas,
      clientesAtendidos: clientesUnicos,
      ventasMembresia,
      ventasSinMembresia,
      boletosPorPelicula,
      boletosPorSala,
      masVendida,
      menosVendida,
      ventasPorUsuario,
      ventasRecientes
    });
  } catch (error) {
    console.error('Error en getResumenVentas:', error);
    res.status(500).json({ error: 'Error al obtener resumen de ventas' });
  }
};
