const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasController');

router.get('/', peliculasController.getPeliculas);
router.post('/', peliculasController.registrarPelicula);
router.get('/:id', peliculasController.getPeliculaPorId);
router.put('/:id', peliculasController.actualizarPelicula);
router.delete('/:id', peliculasController.eliminarPelicula);
router.get('/estadisticas', peliculasController.getEstadisticasPeliculas);
// Agrega esta ruta si quieres estadísticas por género:
router.get('/estadisticas/genero/:genero', peliculasController.getEstadisticasPorGenero);

module.exports = router;