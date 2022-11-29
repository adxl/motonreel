require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const auth = require('./middlewares/auth');

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

app.post('/salons/create', auth, salons.create);

app.get('/salons', auth, salons.findAll);

app.get('/salons/:id', auth, salons.findOne);

app.get('/salons/:id/users', auth, salons.getUsers);

app.patch('/salons/:id', auth, salons.update);

app.delete('/salons/:id', auth, salons.delete);

// Salon / Message Routes



/* User Routes */

const users = require('./controllers/users.controller');

app.post('/register', users.create);

app.post('/login', users.login);

app.get('/me', auth, users.findOneByToken);

app.get('/users', auth, users.findAll);

app.get('/users/:id', auth, users.findOne);

app.patch('/users/:id', auth, users.update);

app.delete('/users/:id', auth, users.delete);

// User / Salon Routes

app.post('/users/addSalon', auth, users.addSalon);

app.post('/users/removeSalon', auth, users.removeSalon);

/* Vehicle Routes */

const vehicles = require('./controllers/vehicles.controller');

app.post('/vehicles/create', vehicles.create);

app.get('/vehicles', vehicles.findAll);

app.get('/vehicles/:id', vehicles.findOne);

app.patch('/vehicles/:id', vehicles.update);

app.delete('/vehicles/:id', vehicles.delete);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
