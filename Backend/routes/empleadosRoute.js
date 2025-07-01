const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
// Rutas para empleados
router.get('/', empleadosController.getEmpleados);
router.post('/', empleadosController.registrarEmpleado);
router.get('/:id', empleadosController.getEmpleadoPorId);
router.put('/:id', empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);

module.exports = router;