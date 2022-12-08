const { Op } = require('sequelize');

const db = require('../db').db;
const RendezVous = db.rendezVous;
const RendezVousType = db.rendezVousType;

// TODO : Check if user exists in all the methods
// TODO : Apart from create, check if the user is the client of the rendezVous

exports.create = async (req, res) => {
  const reqUser = req.user;  
  const { type, date } = req.body;

  if (!type || !date) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVousType = await RendezVousType.findByPk(type);

  if (!rendezVousType) {
    return res.status(404).json({ message: 'RendezVousType not found' });
  }

  const rendezVous = {
    type: type,
    date: date,
    client: reqUser.id,
  };

  await RendezVous.create(rendezVous)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the RendezVous.',
      });
    });
};

exports.findAll = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    const rendezVous = await RendezVous.findAll({
      where: {
        [Op.and]: [
          { client: reqUser.id },
          { date: { [Op.gte]: new Date() }}
        ],
    }
  });
  
    return res.status(200).json(rendezVous);
  }

  const rendezVous = await RendezVous.findAll({
    where: { date: { [Op.gte]: new Date() } },
  });

  return res.status(200).json(rendezVous);
};