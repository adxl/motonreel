module.exports = (sequelize, DataTypes) => {
  const CommRequest = sequelize.define('CommRequest', {
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
  });

  return CommRequest;
};
