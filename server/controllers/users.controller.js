const jwt = require('../lib/jwt');
const bcrypt = require('bcryptjs');

const db = require('../db').db;
const Users = db.users;
const Salon = db.salon;
const SalonController = require('./salon.controller');

// TODO : Apart from create, connected user access

exports.create = async (req, res) => {

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: `Missing required fields ${email} ${password} ${name}` });
  }
  

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email: email,
    password: hashedPassword,
    name: name,
    isAdmin: false,
    disponibility: false,
  };

  user.token = await jwt.createToken(user);

  await Users.create(user)
    .then(({ token }) => {
      res.status(201).json({ token });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: `Missing required fields ${email} ${password}` });
  }
  
  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const same = await bcrypt.compare(password, user.password);

  if (!same) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  const token = await jwt.createToken(user);

  await Users.update(
    { token: token }, 
    {
      where: {
        email: email,
      },
    }
  ).then((num) => {
    if (num == 1) {
      return res.status(200).json({ token });
    } else {
      return res.status(500).json({
        message: `Cannot update User with email=${email}. Maybe User was not found or req.body is empty!`,
      });
    }
  });
};

exports.findOneByToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findOne({
    where: {
      token,
    },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

exports.findAll = async (req, res) => {

  const reqUser = req.user.id;

  const user = await Users.findByPk(reqUser);

  if (!user || !user.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const users = await Users.findAll();

  if (!users) {
    return res.status(404).json({ message: 'No users found' });
  }

  return res.status(200).json(users);
};

exports.findOne = async (req, res) => {

  const reqUser = req.user.id;

  const user = await Users.findByPk(reqUser);

  if (!user) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const email = req.body.email;

  if (!user.isAdmin) {

    return res.status(200).json(user);

  } else {

    if (!email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const user = await Users.findByPk(email);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    return res.status(200).json(user);

  }
};

exports.update = async (req, res) => {

  // User can only update himself

  const email = req.user.id;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await Users.update(req.body, {
    where: { email: user.email },
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

  // User can only delete himself

  const email = req.user.id;

  if (!email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(404).json({ message: 'User not found or already deleted' });
  }

  await Users.destroy({
    where: { email: user.email },
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
    .catch(() => {
      res.status(500).json({
        message: 'Could not delete User',
      });
    });
};

/* Salon relation */

exports.addSalon = async (req, res) => {
  const email = req.user.id;
  const salonId = req.body;

  if (!salonId) {
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

  const totalSalonUsers = await SalonController.getUsers(salonId);

  if (totalSalonUsers >= salon.userSize) {
    return res.status(400).json({ message: 'Salon is full' });
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
  const email = req.user.id;
  const salonId = req.body;

  if (!salonId) {
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

