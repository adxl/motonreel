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

  return Salon;
};
