module.exports = (sequelize, DataTypes) => {
  const CommRequest = sequelize.define('CommRequest', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });

  return CommRequest;
};
