const { Op } = require('sequelize');

const db = require('../db').db;
const PrivateChat = db.privateChat;
const Users = db.users;

exports.create = async (req, res) => {
  const firUserId = req.user.id;
  const secUserId = req.body.secUser;

  if (!firUserId || !secUserId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const firUser = await Users.findByPk(firUserId);
  const secUser = await Users.findByPk(secUserId);

  if (!firUser || !secUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  const privateChat = await PrivateChat.create({
    firUser: firUserId,
    secUser: secUserId,
  });

  return res.status(201).json(privateChat);

};

exports.findAllByToken = async (req, res) => {
  const reqUser = req.user.id;

  const user = await Users.findByPk(reqUser);

  if (!user) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const privateChat = await PrivateChat.findAll({
    where: {
      [Op.or]: [
        { firUser: reqUser },
        { secUser: reqUser },
      ],
    },
  });

  if (!privateChat) {
    return res.status(404).json({ message: 'No privateChat found' });
  }

  return res.status(200).json(privateChat);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user.id;

  if (!reqUser) {
    return res.status(401).json({ message: 'Access denied !' });
  }

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
            firUser: reqUser,
          },
          {
            secUser: reqUser,
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