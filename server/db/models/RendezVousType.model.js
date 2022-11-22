module.exports = (sequelize, DataTypes) => {

  const RendezVousType = sequelize.define('RendezVousType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return RendezVousType;
};
