const Sequelize = require('sequelize');

const isLocal = process.env.STAGE === 'local';
const dialectOptions = !isLocal
  ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {};

const connection = new Sequelize(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dialectOptions,
});

connection.authenticate().then(() => {
  console.log('Connection OK');
});

module.exports = connection;
