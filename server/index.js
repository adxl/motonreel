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

app.get('/salons/:id/messages', auth, salons.getMessages);

app.post('/salons/:id/messages', auth, salons.postMessage);

/* User Routes */

const users = require('./controllers/users.controller');

app.post('/register', users.create);

app.post('/login', users.login);

app.get('/me', auth, users.findOneByToken);

app.get('/users', auth, users.findAll);

app.get('/users/:id', auth, users.findOne);

app.get('/advisors', auth, users.findAdvisors);

app.patch('/users/:id', auth, users.update);

app.delete('/users/:id', auth, users.delete);

// User / Salon Routes

app.post('/users/addSalon', auth, users.addSalon);

app.post('/users/removeSalon', auth, users.removeSalon);

/* RendezVous Routes */

const rendezVous = require('./controllers/rendezVous.controller');

app.get('/rendezvous', auth, rendezVous.findAll);

app.get('/rendezvous/:id', auth, rendezVous.findOne);

app.post('/rendezvous/create', auth, rendezVous.create);

app.patch('/rendezvous/:id', auth, rendezVous.update);

app.delete('/rendezvous/:id', auth, rendezVous.delete);

/* CommRequest Routes */

const commRequest = require('./controllers/commRequest.controller');

app.get('/commRequests', auth, commRequest.findAll);

app.get('/commRequests/:id', auth, commRequest.findOne);

app.post('/commRequests/create', auth, commRequest.create);

app.patch('/commRequests/:id', auth, commRequest.update);

app.delete('/commRequests/:id', auth, commRequest.delete);

// CommRequest / Message Routes

app.get('/commRequests/:id/messages', auth, commRequest.getMessages);

app.post('/commRequests/:id/messages', auth, commRequest.postMessage);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
