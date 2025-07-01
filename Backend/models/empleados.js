const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    genero: { type: String, required: true, enum: ['Masculino', 'Femenino', 'Otro'] },
    puesto: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);