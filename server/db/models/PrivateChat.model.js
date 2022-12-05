module.exports = (sequelize, DataTypes) => {
  const PrivateChat = sequelize.define('PrivateChat', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  });

  return PrivateChat;
};