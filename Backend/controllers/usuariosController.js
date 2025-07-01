const Usuario = require('../models/usuarios');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  const nuevoUsuario = new Usuario(req.body);
  await nuevoUsuario.save();
  res.status(201).json(nuevoUsuario);
};

// Obtener usuario por ID
exports.getUsuarioPorId = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!usuarioActualizado) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuarioActualizado);
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  const usuario = await Usuario.findByIdAndDelete(req.params.id);
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.status(204).send();
};