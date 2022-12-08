module.exports = (sequelize, DataTypes) => {
  const CommRequestStatus = sequelize.define('CommRequestStatus', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CommRequestStatus;
};