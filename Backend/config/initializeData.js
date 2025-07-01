const Pelicula = require('../models/peliculas');

const initialPeliculas = [
  {
    titulo: "Godzilla vs Kong",
    genero: "Acción",
    duracion: 113,
    clasificacion: "B",
    sinopsis: "Dos titanes se enfrentan en una batalla épica.",
    fechaEstreno: new Date("2021-03-31"),
    director: "Adam Wingard",
    actoresPrincipales: ["Alexander Skarsgård", "Millie Bobby Brown"],
    carteleraActiva: true,
    imagen: "assests/img/GvKn.jpg"
  },
  {
    titulo: "Garfield",
    genero: "Animación",
    duracion: 95,
    clasificacion: "A",
    sinopsis: "Las aventuras del gato más famoso del mundo.",
    fechaEstreno: new Date("2024-06-01"),
    director: "Mark Dindal",
    actoresPrincipales: ["Chris Pratt", "Samuel L. Jackson"],
    carteleraActiva: true,
    imagen: "assests/img/Garfield.jpg"
  },
  {
    titulo: "Inside Out 2",
    genero: "Animación",
    duracion: 100,
    clasificacion: "A",
    sinopsis: "Las emociones de Riley viven nuevas aventuras.",
    fechaEstreno: new Date("2024-06-15"),
    director: "Kelsey Mann",
    actoresPrincipales: ["Amy Poehler", "Phyllis Smith"],
    carteleraActiva: true,
    imagen: "assests/img/Inside.jpg"
  },
  {
    titulo: "28 Years Later",
    genero: "Terror",
    duracion: 110,
    clasificacion: "C",
    sinopsis: "El apocalipsis zombi continúa 28 años después.",
    fechaEstreno: new Date("2024-07-01"),
    director: "Danny Boyle",
    actoresPrincipales: ["Cillian Murphy", "Naomie Harris"],
    carteleraActiva: true,
    imagen: "assests/img/28YearsLater.jpg"
  },
  {
    titulo: "Rápidos y Furiosos 9",
    genero: "Acción",
    duracion: 145,
    clasificacion: "B15",
    sinopsis: "Dom y su familia enfrentan nuevos retos.",
    fechaEstreno: new Date("2021-06-25"),
    director: "Justin Lin",
    actoresPrincipales: ["Vin Diesel", "Michelle Rodriguez"],
    carteleraActiva: true,
    imagen: "assests/img/RF.jpg"
  }
];

async function initializeData() {
  const count = await Pelicula.countDocuments();
  if (count === 0) {
    await Pelicula.insertMany(initialPeliculas);
    console.log('Películas iniciales insertadas');
  }
}

module.exports = initializeData;