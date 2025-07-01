const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.getVentas);
router.post('/', ventasController.registrarVenta);
router.get('/:id', ventasController.getVentaPorId);
router.put('/:id', ventasController.actualizarVenta);
router.delete('/:id', ventasController.eliminarVenta);
router.get('/resumen', ventasController.getResumenVentas);

module.exports = router;