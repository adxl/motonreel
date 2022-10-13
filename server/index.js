'use strict';

require("dotenv").config()

const express = require('express');
const cors = require('cors')

const app = express();

const corsConfig = {
  origin: "http://localhost:3000"
} 
app.use(cors(corsConfig))

app.get('/', (_, res) => {
  res.json('Hello World');
});

const PORT = process.env.PORT;
app.listen(PORT,  () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
