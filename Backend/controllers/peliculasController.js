const Pelicula = require('../models/peliculas');
// Obtener todas las películas
exports.getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
};
// Registrar una nueva película
exports.registrarPelicula = async (req, res) => {
  try {
    const nuevaPelicula = new Pelicula(req.body);
    await nuevaPelicula.save();
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar película' });
  }
};  
// Obtener película por ID
exports.getPeliculaPorId = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener película' });
  }
};
// Actualizar película
exports.actualizarPelicula = async (req, res) => {
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!peliculaActualizada) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(peliculaActualizada);
    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar película' });
  }
};
// Eliminar película
exports.eliminarPelicula = async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar película' });
  }
};
// Estadísticas generales de películas
exports.getEstadisticasPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    const totalPeliculas = peliculas.length;
    const totalDuracion = peliculas.reduce((sum, pelicula) => sum + (pelicula.duracion || 0), 0);
    
    // Películas por género
    const porGenero = {};
    peliculas.forEach(pelicula => {
      pelicula.genero.forEach(genero => {
        porGenero[genero] = (porGenero[genero] || 0) + 1;
      });
    });

    res.json({
      totalPeliculas,
      totalDuracion,
      porGenero
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas de películas' });
  }
};
// Estadísticas de películas por género
exports.getEstadisticasPorGenero = async (req, res) => {
  try {
    const genero = req.params.genero;
    const peliculas = await Pelicula.find({ genero: genero });
    
    if (peliculas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron películas para este género' });
    }

    const totalPeliculas = peliculas.length;
    const totalDuracion = peliculas.reduce((sum, pelicula) => sum + (pelicula.duracion || 0), 0);
    
    res.json({
      genero,
      totalPeliculas,
      totalDuracion
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas por género' });
  }
};
