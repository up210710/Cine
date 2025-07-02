// backend/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const initializeData = require('./config/initializeData');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

// Conexión a MongoDB
connectDB().then(initializeData);

// Rutas
app.use('/api/peliculas', require('./routes/peliculasRoute'));
app.use('/api/ventas', require('./routes/ventasRoute'));
app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/empleados', require('./routes/empleadosRoute'));
app.use('/api/estadisticas', require('./routes/estadisticasRoute'));

app.use('/img', express.static(__dirname + '/../Frontend/img'));

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));

module.exports = app; // Para testing