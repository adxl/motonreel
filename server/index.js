'use strict';

require("dotenv").config()
const express = require('express');

const app = express();
app.get('/', (_, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT;
app.listen(PORT,  () => {
  console.log(`Running on http://0.0.0.0:${PORT}`);
});
