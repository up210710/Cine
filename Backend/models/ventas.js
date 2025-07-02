const mongoose = require('mongoose');
const VentaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    pelicula: { type: mongoose.Schema.Types.ObjectId, ref: 'Pelicula', required: true },
    sala: { type: Number, required: true },
    horario: { type: String, required: true },
    fila: { type: String, required: true },
    numero: { type: Number, required: true },
    nombreUsuario: { type: String },
    apellidoUsuario: { type: String },
    emailUsuario: { type: String },
    membresia: { type: Boolean, default: false },
    precio: { type: Number, required: true },
    fechaVenta: { type: Date, default: Date.now }
}, {
    timestamps: true
});
module.exports = mongoose.model('Venta', VentaSchema);