const request = require('supertest');
const app = require('../app');
const Empleado = require('../models/empleados');

describe('API Empleados', () => {
  let empleadoId;

  beforeAll(async () => {
    await Empleado.deleteMany({});
  });

  it('debe crear un nuevo empleado', async () => {
    const res = await request(app)
      .post('/api/empleados')
      .send({
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan@cine.com',
        telefono: '1234567890',
        fechaNacimiento: '1990-01-01',
        genero: 'Masculino',
        puesto: 'Cajero'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Juan');
    empleadoId = res.body._id;
  });

  it('debe obtener todos los empleados', async () => {
    const res = await request(app).get('/api/empleados');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debe obtener un empleado por ID', async () => {
    const res = await request(app).get(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(empleadoId);
  });

  it('debe actualizar un empleado', async () => {
    const res = await request(app)
      .put(`/api/empleados/${empleadoId}`)
      .send({ puesto: 'Gerente' });
    expect(res.statusCode).toBe(200);
    expect(res.body.puesto).toBe('Gerente');
  });

  it('debe eliminar un empleado', async () => {
    const res = await request(app).delete(`/api/empleados/${empleadoId}`);
    expect(res.statusCode).toBe(204);
  });
});