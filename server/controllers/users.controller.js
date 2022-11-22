const db = require('../db').db;
const Users = db.users;

exports.create = async (req, res) => {
  const { email, password, name, token, isAdmin, disponibility } = req.body;

  if (!email || !password || !name || !token || !isAdmin || !disponibility) {
    return res.status(400).json({ message: 'Missing required fields' });
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
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(user);
};

exports.update = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await Users.update(req.body, {
    where: { id: id },
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

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const user = await Users.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found or already deleted' });
  }

  await Users.destroy({
    where: { id: id },
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
