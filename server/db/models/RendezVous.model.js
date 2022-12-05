module.exports = (sequelize, DataTypes) => {
  
  const RendezVous = sequelize.define('RendezVous', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return RendezVous;
};
