module.exports = (sequelize, DataTypes) => {
  const PrivateChatMessage = sequelize.define('PrivateChatMessage', {});

  return PrivateChatMessage;
};