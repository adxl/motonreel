const db = require('../db').db;
const Vehicles = db.vehicles;

exports.create = async (req, res) => {
  const { brand, model, year, kilometers, hp } = req.body;

  if (!brand || !model || !year || !kilometers || !hp) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const vehicle = {
    brand: brand,
    model: model,
    year: year,
    kilometers: kilometers,
    hp: hp,
  };

  await Vehicles.create(vehicle)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Vehicle.',
      });
    });
};

exports.findAll = async (req, res) => {
  const vehicles = await Vehicles.findAll();

  if (!vehicles) {
    return res.status(404).json({ message: 'No vehicles found' });
  }

  return res.status(200).json(vehicles);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const vehicle = await Vehicles.findByPk(id);

  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' });
  }

  return res.status(200).json(vehicle);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const vehicle = await Vehicles.findByPk(id);

  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' });
  }

  await Vehicles.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Vehicle was updated successfully.',
        });
      } else {
        res.status(500).json({
          message: 'Cannot update Vehicle. Maybe Vehicle was not found or req.body is empty!',
        });
      }
    });
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const vehicle = await Vehicles.findByPk(id);

  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' });
  }

  await Vehicles.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'Vehicle was deleted successfully.',
        });
      } else {
        res.status(500).json({
          message: 'Cannot delete Vehicle. Maybe Vehicle was not found!',
        });
      }
    });
};