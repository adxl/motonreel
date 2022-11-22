module.exports = (sequelize, DataTypes) => {
  const SalonUser = sequelize.define('SalonUser', {
    joined: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return SalonUser;
};
