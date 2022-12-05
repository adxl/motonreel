module.exports = (sequelize, DataTypes) => {

  const RendezVousType = sequelize.define('RendezVousType', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return RendezVousType;
};
