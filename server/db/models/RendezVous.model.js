module.exports = (sequelize, DataTypes) => {
  
  const RendezVous = sequelize.define('RendezVous', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return RendezVous;
};
