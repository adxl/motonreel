const { Sequelize } = require('sequelize');

const isLocal = process.env.STAGE === 'local';
const dialectOptions = !isLocal
  ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {};

const { DataTypes } = Sequelize;

const connection = new Sequelize(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dialectOptions,
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

connection.authenticate().then(() => {
  console.log('Connection OK');
});

const showTables = async () => {
  connection.getQueryInterface().showAllTables().then((tables) => {
    console.log(tables);
  });
};

/* Models Declaration */


db.users = require('./models/Users.model')(connection, DataTypes);
db.salon = require('./models/Salon.model')(connection, DataTypes);

db.salonUser = require('./models/SalonUser.model')(connection, DataTypes);
db.users.belongsToMany(db.salon, {
  through: db.salonUser,
});
db.salon.belongsToMany(db.users, {
  through: db.salonUser,
});

db.privateChat = require('./models/PrivateChat.model')(connection, DataTypes);
db.users.hasMany(db.privateChat, {
  foreignKey: 'firUser',
  allowNull: false,
});
db.users.hasMany(db.privateChat, {
  foreignKey: 'secUser',
  allowNull: false,
});

db.message = require('./models/Message.model')(connection, DataTypes);
db.users.hasMany(db.message, {
  foreignKey: 'sender',
});

db.salonMessage = require('./models/SalonMessage.model')(connection, DataTypes);
db.message.belongsToMany(db.salon, {
  through: db.salonMessage,
});
db.salon.belongsToMany(db.message, {
  through: db.salonMessage,
});

db.privateChatMessage = require('./models/PrivateChatMessage.model')(connection, DataTypes);
db.message.belongsToMany(db.privateChat, {
  through: db.privateChatMessage,
});
db.privateChat.belongsToMany(db.message, {
  through: db.privateChatMessage,
});

db.commRequest = require('./models/CommRequest.model')(connection, DataTypes);
db.users.hasMany(db.commRequest, {
  foreignKey: {
    name: 'client',
    allowNull: false,
  },
});
db.users.hasMany(db.commRequest, {
  foreignKey: {
    name: 'advisor',
    allowNull: false,
  },
});


db.commRequestMessage = require('./models/CommRequestMessage.model')(connection, DataTypes);
db.message.belongsToMany(db.commRequest, {
  through: db.commRequestMessage,
});
db.commRequest.belongsToMany(db.message, {
  through: db.commRequestMessage,
});

db.rendezVousType = require('./models/RendezVousType.model')(connection, DataTypes);
db.rendezVous = require('./models/RendezVous.model')(connection, DataTypes);
db.rendezVousType.hasMany(db.rendezVous, {
  foreignKey: {
    name: 'type',
    allowNull: false,
  },
});
db.users.hasMany(db.rendezVous, {
  foreignKey: {
    name: 'client',
    allowNull: false,
  },
});

/* Database Initialization */

const initDatabase = async () => {
  console.log('Initializing database');

  db.connection.sync({ alter: true, logging: true, force: true });

  console.log('Database synced');
};

module.exports = {
  connection, showTables, initDatabase, db
};
