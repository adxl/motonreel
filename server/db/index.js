const { Sequelize, Op } = require("sequelize");

const isLocal = process.env.STAGE === "local";
const dialectOptions = !isLocal
  ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  : {};

const { DataTypes } = Sequelize;

const connection = new Sequelize(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dialectOptions,
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

connection.authenticate().then(() => {
  console.log("Connection OK");
});

const showTables = async () => {
  connection
    .getQueryInterface()
    .showAllTables()
    .then((tables) => {
      console.log(tables);
    });
};

/* Models Declaration */

db.users = require("./models/Users.model")(connection, DataTypes);
db.salon = require("./models/Salon.model")(connection, DataTypes);

db.privateChat = require("./models/PrivateChat.model")(connection, DataTypes);
db.users.hasMany(db.privateChat, {
  foreignKey: "firUser",
  allowNull: false,
});
db.users.hasMany(db.privateChat, {
  foreignKey: "secUser",
  allowNull: false,
});

db.message = require("./models/Message.model")(connection, DataTypes);
db.users.hasMany(db.message, {
  foreignKey: "sender",
});
db.message.belongsTo(db.users, {
  foreignKey: {
    name: "sender",
    allowNull: false,
  },
  as: "senderUser",
});

db.salonMessage = require("./models/SalonMessage.model")(connection, DataTypes);
db.message.belongsToMany(db.salon, {
  through: db.salonMessage,
});
db.salon.belongsToMany(db.message, {
  through: db.salonMessage,
});

db.privateChatMessage = require("./models/PrivateChatMessage.model")(
  connection,
  DataTypes
);
db.message.belongsToMany(db.privateChat, {
  through: db.privateChatMessage,
});
db.privateChat.belongsToMany(db.message, {
  through: db.privateChatMessage,
});

db.CommRequestStatus = require("./models/CommRequestStatus.model")(
  connection,
  DataTypes
);

db.commRequest = require("./models/CommRequest.model")(connection, DataTypes);
db.users.hasMany(db.commRequest, {
  foreignKey: {
    name: "client",
    allowNull: false,
  },
});
db.users.hasMany(db.commRequest, {
  foreignKey: {
    name: "advisor",
    allowNull: false,
  },
});
db.commRequest.belongsTo(db.users, {
  foreignKey: {
    name: "client",
    allowNull: false,
  },
  as: "clientUser",
});
db.commRequest.belongsTo(db.users, {
  foreignKey: {
    name: "advisor",
    allowNull: false,
  },
  as: "advisorUser",
});
db.CommRequestStatus.hasMany(db.commRequest, {
  foreignKey: {
    name: "status",
    allowNull: false,
  },
});
db.commRequest.belongsTo(db.CommRequestStatus, {
  foreignKey: {
    name: "status",
    allowNull: false,
  },
  as: "requestStatus",
});

db.commRequestMessage = require("./models/CommRequestMessage.model")(
  connection,
  DataTypes
);
db.message.belongsToMany(db.commRequest, {
  through: db.commRequestMessage,
});
db.commRequest.belongsToMany(db.message, {
  through: db.commRequestMessage,
});

db.rendezVousType = require("./models/RendezVousType.model")(
  connection,
  DataTypes
);
db.rendezVous = require("./models/RendezVous.model")(connection, DataTypes);
db.rendezVousType.hasMany(db.rendezVous, {
  foreignKey: {
    name: "type",
    allowNull: false,
  },
});

db.rendezVous.belongsTo(db.rendezVousType, {
  foreignKey: "type",
});
db.users.hasMany(db.rendezVous, {
  foreignKey: {
    name: "client",
    allowNull: false,
  },
});

/* Database Initialization */

const initDatabase = async () => {
  console.log("Initializing database");

  await db.connection.sync({ alter: true, logging: true });

  await db.CommRequestStatus.destroy({
    where: {
      [Op.or]: [
        { id: "a57014e4-19bd-471c-979a-1c77cc16ad4a" },
        { id: "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c" },
        { id: "342fc969-aa8f-486c-88b4-821042a01640" },
        { id: "770fbb69-658a-4dc9-b5ed-26ae596793a7" },
      ],
    },
  });

  /* TABLE CommRequestStatus */
  await db.CommRequestStatus.create({
    id: "a57014e4-19bd-471c-979a-1c77cc16ad4a",
    name: "En attente",
  });

  await db.CommRequestStatus.create({
    id: "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c",
    name: "Acceptée",
  });

  await db.CommRequestStatus.create({
    id: "342fc969-aa8f-486c-88b4-821042a01640",
    name: "Refusée",
  });

  await db.CommRequestStatus.create({
    id: "770fbb69-658a-4dc9-b5ed-26ae596793a7",
    name: "Terminée",
  });

  /* TABLE RendezVousType */

  await db.rendezVousType.destroy({
    where: {
      [Op.or]: [
        { id: "a3b548d9-f83a-4738-ace7-d104671b07c3" },
        { id: "9f937831-47ee-4a22-9249-cbacf9d1f3f6" },
        { id: "74e2746c-48e3-4caa-bccf-a0be5b1107be" },
        { id: "fb0c3373-9ff7-4290-9bac-cac5503108ea" },
      ],
    },
  });

  await db.rendezVousType.create({
    id: "a3b548d9-f83a-4738-ace7-d104671b07c3",
    name: "Classique",
  });

  await db.rendezVousType.create({
    id: "9f937831-47ee-4a22-9249-cbacf9d1f3f6",
    name: "Routier",
  });

  await db.rendezVousType.create({
    id: "74e2746c-48e3-4caa-bccf-a0be5b1107be",
    name: "Tout-terrains",
  });

  await db.rendezVousType.create({
    id: "fb0c3373-9ff7-4290-9bac-cac5503108ea",
    name: "Sportif",
  });

  console.log("Database synced");
};

module.exports = {
  connection,
  showTables,
  initDatabase,
  db,
};
