const mongoose = require('mongoose');
const PeliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    genero: { type: String, required: true },
    duracion: { type: Number, required: true }, // Duración en minutos
    clasificacion: { type: String, required: true },
    sinopsis: { type: String, required: true },
    fechaEstreno: { type: Date, required: true },
    director: { type: String, required: true },
    actoresPrincipales: [{ type: String, required: true }],
    carteleraActiva: { type: Boolean, default: true },
    imagen: { type: String, required: false } // <--- AGREGA ESTA LÍNEA
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);