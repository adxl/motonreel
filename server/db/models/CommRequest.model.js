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
    client: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'email',
      },
    },
    advisor: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'email',
      },
    },
  });

  CommRequest.associate = (models) => {
    CommRequest.belongsTo(models.Users, {
      foreignKey: {
        name: 'client',
        allowNull: false,
      },
    });
    CommRequest.belongsTo(models.Users, {
      foreignKey: {
        name: 'advisor',
        allowNull: false,
      },
    });
  };

  return CommRequest;
};
