const request = require('supertest');
const app = require('../app');
const Venta = require('../models/ventas');
const Usuario = require('../models/usuarios');
const Pelicula = require('../models/peliculas');

describe('API Ventas', () => {
  let ventaId, usuarioId, peliculaId;

  beforeAll(async () => {
    await Venta.deleteMany({});
    await Usuario.deleteMany({});
    await Pelicula.deleteMany({});
    // Crea usuario y película para la venta
    const usuario = await Usuario.create({
      nombre: 'Carlos',
      apellido: 'Ramírez',
      email: 'carlos@cine.com',
      telefono: '1112223333',
      fechaNacimiento: '1992-02-02',
      genero: 'Masculino',
      membresia: false,
      contrasena: 'abc123'
    });
    usuarioId = usuario._id;
    const pelicula = await Pelicula.create({
      titulo: "Venta Movie",
      genero: "Drama",
      duracion: 100,
      clasificacion: "B",
      sinopsis: "Venta test.",
      fechaEstreno: "2024-01-01",
      director: "Director Venta",
      actoresPrincipales: ["Actor X"],
      carteleraActiva: true,
      imagen: "assests/img/test.jpg"
    });
    peliculaId = pelicula._id;
  });

  it('debe crear una nueva venta', async () => {
    const res = await request(app)
      .post('/api/ventas')
      .send({
        usuario: usuarioId,
        pelicula: peliculaId,
        sala: 1,
        horario: "12:00 PM",
        fila: "A",
        numero: 1,
        membresia: false,
        precio: 75
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.usuario).toBe(String(usuarioId));
    ventaId = res.body._id;
  });

  it('debe obtener todas las ventas', async () => {
    const res = await request(app).get('/api/ventas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debe obtener una venta por ID', async () => {
    const res = await request(app).get(`/api/ventas/${ventaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(ventaId);
  });

  it('debe actualizar una venta', async () => {
    const res = await request(app)
      .put(`/api/ventas/${ventaId}`)
      .send({ precio: 100 });
    expect(res.statusCode).toBe(200);
    expect(res.body.precio).toBe(100);
  });

  it('debe eliminar una venta', async () => {
    const res = await request(app).delete(`/api/ventas/${ventaId}`);
    expect(res.statusCode).toBe(204);
  });
});