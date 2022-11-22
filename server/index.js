require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsConfig));

app.get('/', (_, res) => {
  res.json('Hello Word !');
});

// Parsing body content to json
app.use(express.json());

/* Salon Routes */

const salons = require('./controllers/salon.controller');

app.get('/salons', (_, res) => {
  const AllSalons = salons.findAll();

  if (!AllSalons) {
    return res.status(404).json({ message: 'No salons found' });
  }

  return res.status(200).json(AllSalons);
});

app.get('/salons/:id', (req, res) => {
  const { id } = req.params;
  const salon = salons.findOne(id);

  if (!salon) {
    return res.status(404).json({ message: 'Salon not found' });
  }

  return res.status(200).json(salon);
});

app.post('/salons/create', (req, res) => {
  const { name, userSize } = req.query;

  if (!name || !userSize) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const salon = salons.create(name, userSize);

  if (!salon) {
    return res.status(500).json({ message: 'Error creating salon' });
  }

  return res.status(201).json(salon);
});

app.put('/salons/:id', (req, res) => {
  const { id } = req.params;
  const { name, userSize } = req.query;

  if (!name || !userSize) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const salon = salons.update(id, name, userSize);

  if (!salon) {
    return res.status(500).json({ message: 'Error updating salon' });
  }

  return res.status(200).json(salon);
});

app.delete('/salons/:id', (req, res) => {
  const { id } = req.params;

  const salon = salons.findOne(id);

  if (!salon) {
    return res.status(404).json({ message: 'Salon not found or already deleted' });
  }

  

  return res.status(200).json('Salon deleted');
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
