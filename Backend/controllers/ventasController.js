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
    // Buscar el usuario para obtener sus datos
    const usuario = await Usuario.findById(req.body.usuario);
    if (!usuario) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    // Copiar datos del usuario a la venta
    const ventaData = {
      ...req.body,
      membresia: usuario.membresia,
      nombreUsuario: usuario.nombre,
      apellidoUsuario: usuario.apellido,
      emailUsuario: usuario.email
    };
    const nuevaVenta = new Venta(ventaData);
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
    // Incluir ventas que tengan película y datos de usuario referenciado o embebido
    const ventasValidas = ventas.filter(
      v => ( (v.usuario && v.usuario._id) || v.emailUsuario ) && (v.pelicula && v.pelicula.titulo)
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
    // Ajustar clientes únicos para usar emailUsuario si no hay usuario referenciado
    const clientesUnicosSet = new Set();
    ventasValidas.forEach(v => {
      if (v.usuario && v.usuario._id) {
        clientesUnicosSet.add(v.usuario._id.toString());
      } else if (v.emailUsuario) {
        clientesUnicosSet.add(v.emailUsuario);
      }
    });
    const clientesUnicos = clientesUnicosSet.size;
    // Ajustar ventas con/sin membresía para usar datos embebidos
    const ventasMembresia = ventasValidas.filter(v => (v.usuario ? v.usuario.membresia : v.membresia)).length;
    const ventasSinMembresia = ventasValidas.filter(v => (v.usuario ? !v.usuario.membresia : !v.membresia)).length;

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
      // Usar datos embebidos si no hay usuario referenciado
      const uid = v.usuario?._id?.toString() || v.emailUsuario || v._id.toString();
      const nombre = v.usuario ? `${v.usuario.nombre} ${v.usuario.apellido}` : `${v.nombreUsuario || ''} ${v.apellidoUsuario || ''}`.trim();
      const email = v.usuario ? v.usuario.email : v.emailUsuario || 'N/A';
      const membresia = v.usuario ? (v.usuario.membresia ? 'Sí' : 'No') : (v.membresia ? 'Sí' : 'No');
      if (!ventasPorUsuario[uid]) {
        ventasPorUsuario[uid] = {
          nombre,
          email,
          membresia,
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
      usuario: v.usuario ? `${v.usuario.nombre} ${v.usuario.apellido}` : `${v.nombreUsuario || ''} ${v.apellidoUsuario || ''}`.trim() || 'N/A',
      email: v.usuario ? v.usuario.email : v.emailUsuario || 'N/A',
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
    res.status(500).json({ error: 'Error al obtener resumen de ventas', detalle: error.message, stack: error.stack });
  }
};
