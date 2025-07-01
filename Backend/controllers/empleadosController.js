const Empleado = require('../models/empleados');
// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados' });
  }
};
// Registrar un nuevo empleado
exports.registrarEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    await nuevoEmpleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar empleado' });
  }
};
// Obtener empleado por ID
exports.getEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};
// Actualizar empleado
exports.actualizarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!empleadoActualizado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleadoActualizado);
    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};
// Eliminar empleado    
exports.eliminarEmpleado = async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};
