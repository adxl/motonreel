const db = require('../db').db;
const RendezVous = db.rendezVous;
const Users = db.users;
const RendezVousType = db.rendezVousType;

exports.create = async (req, res) => {
  const { type, date, email } = req.body;

  if (!type || !date || !user) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVousType = await RendezVousType.findByPk(type);

  if (!rendezVousType) {
    return res.status(404).json({ message: 'RendezVousType not found' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const rendezVous = {
    type: type,
    date: date,
    client: email,
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
  const rendezVous = await RendezVous.findAll();

  if (!rendezVous) {
    return res.status(404).json({ message: 'No rendezVous found' });
  }

  return res.status(200).json(rendezVous);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  return res.status(200).json(rendezVous);
};

exports.findAllByUser = async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findAll({
    where: { client: email },
  });

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  return res.status(200).json(rendezVous);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  await RendezVous.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'RendezVous was updated successfully.',
        });
      } else {
        res.status(500).json({
          message: `Cannot update RendezVous with id=${id}. Maybe RendezVous was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Error updating RendezVous with id=' + id,
      });
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  await RendezVous.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'RendezVous was deleted successfully!',
        });
      } else {
        res.status(500).json({
          message: `Cannot delete RendezVous with id=${id}. Maybe RendezVous was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not delete RendezVous with id=' + id,
      });
    });
};

// QUESTION : find all by type ?