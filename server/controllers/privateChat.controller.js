const { Op } = require('sequelize');

const db = require('../db').db;
const PrivateChat = db.privateChat;
const Users = db.users;

exports.create = async (req, res) => {
  const reqUser = req.user;
  const secUserId = req.body.secUser;

  if (!secUserId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const secUser = await Users.findByPk(secUserId);

  if (!secUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const privateChat = await PrivateChat.create({
    firUser: reqUser.id,
    secUser: secUserId,
  });

  return res.status(201).json(privateChat);
};

exports.findAllByToken = async (req, res) => {
  const reqUser = req.user;

  const privateChat = await PrivateChat.findAll({
    where: {
      [Op.or]: [
        { firUser: reqUser.id },
        { secUser: reqUser.id },
      ],
    },
  });

  if (!privateChat) {
    return res.status(404).json({ message: 'No privateChat found' });
  }

  return res.status(200).json(privateChat);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const privateChat = await PrivateChat.findOne({
    where: {
      [Op.and]: {
        id: id,
        [Op.or]: [
          {
            firUser: reqUser.id,
          },
          {
            secUser: reqUser.id,
          },
        ],
      },
    }
  }).catch((err) => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving the CommRequests.',
    });
  });

  if (!privateChat) {
    return res.status(404).json({ message: 'PrivateChat not found' });
  }

  return res.status(200).json(privateChat);
};