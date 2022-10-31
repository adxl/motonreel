import { Sequelize } from "sequelize";

const isLocal = process.env.STAGE === 'local';
const dialectOptions = !isLocal
  ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {};

const DataTypes = Sequelize.DataTypes;

export const connection = new Sequelize(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  dialectOptions,
});

connection.authenticate().then(() => {
  console.log('Connection OK');
});

export const showTables = async () => {
  connection.getQueryInterface().showAllTables().then((tables) => {
    console.log(tables);
  });
};

export const initDatabase = async () => {

  const Users = connection.define("Users", {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disponibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  Users.sync({ alter: true });

  const Salon = connection.define("Salon", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  Salon.sync({ alter: true });

  const SalonUser = connection.define("SalonUser", {
    salon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Salon,
        key: 'id',
      }
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Users,
        key: 'email',
      }
    },
    joined: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  SalonUser.sync({ alter: true });

  const Vehicle = connection.define("Vehicle", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kilometers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Vehicle.sync({ alter: true });

  const Message = connection.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'email',
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Message.sync({ alter: true });

  const SalonMessage = connection.define("SalonMessage", {
    salon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Salon,
        key: 'id',
      }
    },
    message: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Message,
        key: 'id',
      }
    },
  });
  SalonMessage.sync({ alter: true });

  const CommRequest = connection.define("CommRequest", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'email',
      }
    },
    advisor: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'email',
      }
    },
  });
  CommRequest.sync({ alter: true });

  const CommRequestMessage = connection.define("CommRequestMessage", {
    message: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Message,
        key: 'id',
      }
    },
    request: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: CommRequest,
        key: 'id',
      }
    },
  });
  CommRequestMessage.sync({ alter: true });

  const RendezVousType = connection.define("RendezVousType", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  RendezVousType.sync({ alter: true });

  const RendezVous = connection.define("RendezVous", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Users,
        key: 'email',
      }
    },
  });
  RendezVous.sync({ alter: true });

  connection.sync({ alter: true });
}