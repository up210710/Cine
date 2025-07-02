const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
// Rutas para usuarios
router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.registrarUsuario);
router.get('/:id', usuariosController.getUsuarioPorId);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);
router.post('/:id/membresia', usuariosController.activarMembresia);

module.exports = router;