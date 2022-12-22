const { Op } = require("sequelize");

const db = require("../db").db;
const PrivateChat = db.privateChat;
const Users = db.users;

exports.create = async (req, res) => {
  const reqUser = req.user;
  const secUserId = req.body.secUser;

  if (!secUserId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const secUser = await Users.findByPk(secUserId);

  if (!secUser) {
    return res.status(404).json({ message: "User not found" });
  }

  await PrivateChat.create({
    firUser: reqUser.id,
    secUser: secUserId,
  });

  const privateChat = await PrivateChat.findOne({
    where: {
      [Op.or]: [
        {
          firUser: reqUser.id,
          secUser: secUserId,
        },
        {
          firUser: secUserId,
          secUser: reqUser.id,
        },
      ],
    },
    include: [
      {
        model: Users,
        as: "secondUser",
        attributes: ["id", "name"],
      },
      {
        model: Users,
        as: "firstUser",
        attributes: ["id", "name"],
      },
      {
        model: db.message,
        as: "Messages",
        include: [
          {
            model: db.users,
            as: "senderUser",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  }).catch((err) => {
    return res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving the CommRequests.",
    });
  });

  return res.status(201).json(privateChat);
};

exports.findAllByToken = async (req, res) => {
  const reqUser = req.user;

  const privateChat = await PrivateChat.findAll({
    where: {
      [Op.or]: [{ firUser: reqUser.id }, { secUser: reqUser.id }],
    },
  });

  return res.status(200).json(privateChat);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const secUserId = req.params.id;

  if (!secUserId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const privateChat = await PrivateChat.findOne({
    where: {
      [Op.or]: [
        {
          firUser: reqUser.id,
          secUser: secUserId,
        },
        {
          firUser: secUserId,
          secUser: reqUser.id,
        },
      ],
    },
    include: [
      {
        model: Users,
        as: "secondUser",
        attributes: ["id", "name"],
      },
      {
        model: Users,
        as: "firstUser",
        attributes: ["id", "name"],
      },
      {
        model: db.message,
        as: "Messages",
        include: [
          {
            model: db.users,
            as: "senderUser",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  }).catch((err) => {
    return res.status(500).json({
      message:
        err.message || "Some error occurred while retrieving the CommRequests.",
    });
  });

  if (!privateChat) {
    return res.status(404).json({ message: "PrivateChat not found" });
  }

  return res.status(200).json(privateChat);
};
