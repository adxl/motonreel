module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Users, {
      foreignKey: {
        name: 'sender',
        allowNull: false,
      },
    });
    Message.belongsToMany(models.Salon, {
      through: models.SalonMessage,
    });
    Message.belongsToMany(models.CommRequest, {
      through: models.CommRequestMessage,
    });
  };

  return Message;
};
