const request = require('supertest');
const app = require('../app');
const Usuario = require('../models/usuarios');

describe('API Usuarios', () => {
  let usuarioId;

  beforeAll(async () => {
    await Usuario.deleteMany({});
  });

  it('debe crear un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nombre: 'Ana',
        apellido: 'López',
        email: 'ana@cine.com',
        telefono: '9876543210',
        fechaNacimiento: '1995-05-10',
        genero: 'Femenino',
        membresia: false,
        contrasena: '123456'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Ana');
    usuarioId = res.body._id;
  });

  it('debe obtener todos los usuarios', async () => {
    const res = await request(app).get('/api/usuarios');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debe obtener un usuario por ID', async () => {
    const res = await request(app).get(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(usuarioId);
  });

  it('debe actualizar un usuario', async () => {
    const res = await request(app)
      .put(`/api/usuarios/${usuarioId}`)
      .send({ membresia: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.membresia).toBe(true);
  });

  it('debe eliminar un usuario', async () => {
    const res = await request(app).delete(`/api/usuarios/${usuarioId}`);
    expect(res.statusCode).toBe(204);
  });
});