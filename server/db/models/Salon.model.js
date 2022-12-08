module.exports = (sequelize, DataTypes) => {
  const Salon = sequelize.define('Salon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
