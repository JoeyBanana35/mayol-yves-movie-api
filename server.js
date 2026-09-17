const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

let movies = [
  { id: 1, title: 'Interstellar', genre: 'Science Fiction', year: 2014 },
  { id: 2, title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
  { id: 3, title: 'Coco', genre: 'Animation', year: 2017 }
];

let nextId = 4;

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  res.json(movie);
});

app.post('/api/movies', (req, res) => {
  const { title, genre, year } = req.body;

  if (!title || !genre || !year) {
    return res.status(400).json({ error: 'Missing required fields: title, genre, year' });
  }

  const newMovie = {
    id: nextId++,
    title,
    genre,
    year: Number(year)
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});