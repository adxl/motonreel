const db = require('../db').db;
const Users = db.users;
const Salon = db.salon;

exports.create = async (req, res) => {
  const { email, password, name, token, isAdmin, disponibility } = req.body;

  if (!email || !password || !name || !token || typeof isAdmin === 'undefined' || typeof disponibility === 'undefined') {
    return res.status(400).json({ message: `Missing required fields ${email} ${password} ${name} ${token} ${isAdmin} ${disponibility}` });
  }

  const user = {
    email: email,
    password: password,
    name: name,
    token: token,
    isAdmin: isAdmin,
    disponibility: disponibility,
  };

  await Users.create(user)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.findAll = async (req, res) => {
  const users = await Users.findAll();

  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.status(200).json(users);
};

exports.findOne = async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

exports.update = async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await Users.update(req.body, {
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'User was updated successfully.',
        });
      } else {
        res.status(500).json({
          message: 'Cannot update User. Maybe User was not found or req.body is empty!',
        });
      }
    });
};

// QUESTION : Hard or soft delete ?

exports.delete = async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found or already deleted' });
  }

  await Users.destroy({
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'User was deleted successfully!',
        });
      } else {
        res.status(500).json({
          message: 'Cannot delete User. Maybe User was not found!',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Could not delete User',
      });
    });
};

/* Salon relation */

exports.addSalon = async (req, res) => {
  const { email, salonId } = req.body;

  if (!email || !salonId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const salon = await Salon.findByPk(salonId);

  if (!salon) {
    return res.status(404).json({ message: 'Salon not found' });
  }

  await user.addSalon(salon, {
    through: { joined: new Date() },
  })
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || 'Some error occurred while adding the Salon.',
      });
    });
};

exports.removeSalon = async (req, res) => {
  const { email, salonId } = req.body;

  if (!email || !salonId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const salon = await Salon.findByPk(salonId);

  if (!salon) {
    return res.status(404).json({ message: 'Salon not found' });
  }

  await user.removeSalon(salon)
    .then(() => {
      return res.status(200).json({ message: 'Salon removed from user' });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || 'Some error occurred while removing the Salon.',
      });
    });
};
