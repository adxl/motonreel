module.exports = (sequelize, DataTypes) => {
  const Salon = sequelize.define('Salon', {
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
    },
  });

  Salon.associate = (models) => {
    Salon.belongsToMany(models.Users, {
      through: models.SalonUser,
    });
    Salon.belongsToMany(models.Message, {
      through: models.SalonMessage,
    });
  };

  return Salon;
};
