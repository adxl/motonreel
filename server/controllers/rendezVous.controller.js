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
    return res.status(401).json({ message: 'Access denied !' });
  }

  const rendezVous = await RendezVous.findAll();

  if (!rendezVous) {
    return res.status(404).json({ message: 'No rendezVous found' });
  }

  return res.status(200).json(rendezVous);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  if (rendezVous.client !== reqUser.id && !reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  return res.status(200).json(rendezVous);
};

exports.findAllByToken = async (req, res) => {
  const reqUser = req.user;

  if (reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const rendezVous = await RendezVous.findAll({
    where: { client: reqUser.id },
  });

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  return res.status(200).json(rendezVous);
};

exports.update = async (req, res) => {
  const reqUser = req.user;

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  if (rendezVous.client !== reqUser.id && !reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
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
    .catch(() => {
      res.status(500).json({
        message: 'Error updating RendezVous with id=' + id,
      });
    });
};

exports.delete = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const rendezVous = await RendezVous.findByPk(id);

  if (!rendezVous) {
    return res.status(404).json({ message: 'RendezVous not found' });
  }

  if (rendezVous.client !== reqUser.id && !reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
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
    .catch(() => {
      res.status(500).json({
        message: 'Could not delete RendezVous with id=' + id,
      });
    });
};
