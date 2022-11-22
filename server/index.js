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

app.post('/salons/create', salons.create);

app.get('/salons', salons.findAll);

app.get('/salons/:id', salons.findOne);

app.patch('/salons/:id', salons.update);

app.delete('/salons/:id', salons.delete);

/* User Routes */

const users = require('./controllers/users.controller');

app.post('/users/create', users.create);

app.get('/users', users.findAll);

app.get('/users/:id', users.findOne);

app.patch('/users/:id', users.update);

app.delete('/users/:id', users.delete);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
