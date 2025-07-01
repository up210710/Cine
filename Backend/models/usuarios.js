const mongoose = require('mongoose');
const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    genero: { type: String, required: true, enum: ['Masculino', 'Femenino', 'Otro'] },
    membresia: { type: Boolean, default: false },
    contrasena: { type: String, required: true }, // Agregado para autenticación
    fechaRegistro: { type: Date, default: Date.now },
    rol: { type: String, enum: ['usuario', 'empleado', 'admin'], default: 'usuario' }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});
module.exports = mongoose.model('Usuario', UsuarioSchema);