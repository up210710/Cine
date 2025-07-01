const request = require('supertest');
const app = require('../app');
const Pelicula = require('../models/peliculas');

describe('API Películas', () => {
  let peliculaId;

  beforeAll(async () => {
    await Pelicula.deleteMany({});
  });

  it('debe crear una nueva película', async () => {
    const res = await request(app)
      .post('/api/peliculas')
      .send({
        titulo: "Godzilla vs Kong",
        genero: "Acción",
        duracion: 113,
        clasificacion: "B",
        sinopsis: "Dos titanes se enfrentan en una batalla épica.",
        fechaEstreno: "2021-03-31",
        director: "Adam Wingard",
        actoresPrincipales: ["Alexander Skarsgård", "Millie Bobby Brown"],
        carteleraActiva: true,
        imagen: "assests/img/GvKn.jpg"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Godzilla vs Kong");
    peliculaId = res.body._id;
  });

  it('debe crear otra película', async () => {
    const res = await request(app)
      .post('/api/peliculas')
      .send({
        titulo: "Garfield",
        genero: "Animación",
        duracion: 95,
        clasificacion: "A",
        sinopsis: "Las aventuras del gato más famoso del mundo.",
        fechaEstreno: "2024-06-01",
        director: "Mark Dindal",
        actoresPrincipales: ["Chris Pratt", "Samuel L. Jackson"],
        carteleraActiva: true,
        imagen: "assests/img/Garfield.jpg"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Garfield");
  });

  it('debe crear otra película', async () => {
    const res = await request(app)
      .post('/api/peliculas')
      .send({
        titulo: "Inside Out 2",
        genero: "Animación",
        duracion: 100,
        clasificacion: "A",
        sinopsis: "Las emociones de Riley viven nuevas aventuras.",
        fechaEstreno: "2024-06-15",
        director: "Kelsey Mann",
        actoresPrincipales: ["Amy Poehler", "Phyllis Smith"],
        carteleraActiva: true,
        imagen: "assests/img/Inside.jpg"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Inside Out 2");
  });

  it('debe crear otra película', async () => {
    const res = await request(app)
      .post('/api/peliculas')
      .send({
        titulo: "28 Years Later",
        genero: "Terror",
        duracion: 110,
        clasificacion: "C",
        sinopsis: "El apocalipsis zombi continúa 28 años después.",
        fechaEstreno: "2024-07-01",
        director: "Danny Boyle",
        actoresPrincipales: ["Cillian Murphy", "Naomie Harris"],
        carteleraActiva: true,
        imagen: "assests/img/28YearsLater.jpg"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("28 Years Later");
  });

  it('debe crear otra película', async () => {
    const res = await request(app)
      .post('/api/peliculas')
      .send({
        titulo: "Rápidos y Furiosos 9",
        genero: "Acción",
        duracion: 145,
        clasificacion: "B15",
        sinopsis: "Dom y su familia enfrentan nuevos retos.",
        fechaEstreno: "2021-06-25",
        director: "Justin Lin",
        actoresPrincipales: ["Vin Diesel", "Michelle Rodriguez"],
        carteleraActiva: true,
        imagen: "assests/img/RF.jpg"
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe("Rápidos y Furiosos 9");
  });

  it('debe obtener todas las películas', async () => {
    const res = await request(app).get('/api/peliculas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(5);
  });

  it('debe obtener una película por ID', async () => {
    const res = await request(app).get(`/api/peliculas/${peliculaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(peliculaId);
  });

  it('debe actualizar una película', async () => {
    const res = await request(app)
      .put(`/api/peliculas/${peliculaId}`)
      .send({ clasificacion: "A" });
    expect(res.statusCode).toBe(200);
    expect(res.body.clasificacion).toBe("A");
  });

  it('debe eliminar una película', async () => {
    const res = await request(app).delete(`/api/peliculas/${peliculaId}`);
    expect(res.statusCode).toBe(204);
  });
});