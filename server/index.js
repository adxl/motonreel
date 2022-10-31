import { initDatabase, showTables } from './db/db.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

const env = dotenv.config();

const app = express();

const corsConfig = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsConfig));

app.get('/', (_, res) => {
  res.json('Hello Word !');
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});

app.get('/initDB', async function (_, res) {
  await initDatabase();
  res.status(200).json('Database initialized');
});

app.get('/showTables', async function (_, res) {
  await showTables();
  res.status(200).json('Tables shown');
});
