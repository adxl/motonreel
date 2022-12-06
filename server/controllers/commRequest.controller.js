const { Op } = require('sequelize');

const db = require('../db').db;
const CommRequest = db.commRequest;
const Users = db.users;
const Message = db.message;

// TODO : Check if user exists in all the methods
// TODO : Apart from create, check if user is the client or the advisor in all the methods

exports.create = async (req, res) => {
  const { status, advisor } = req.body;
  const reqUser = req.user;

  if (!status || !advisor) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }
  
  const advisorUser = await Users.findByPk(advisor);

  if (!advisorUser) {
    return res.status(404).json({ message: 'Advisor not found' });
  }

  if (!advisor.disponibility) {
    return res.status(400).json({ message: 'Advisor not available' });
  }

  const commRequest = {
    status: status,
    client: reqUser.email,
    advisor: advisor,
  };

  await CommRequest.create(commRequest)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the CommRequest.',
      });
    });
};

exports.findAll = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const commRequest = await CommRequest.findAll();

  if (!commRequest) {
    return res.status(404).json({ message: 'No commRequest found' });
  }

  return res.status(200).json(commRequest);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const commRequest = await CommRequest.findByPk(id);

  if (!commRequest) {
    return res.status(404).json({ message: 'CommRequest not found' });
  }

  if (!reqUser.isAdmin && commRequest.client !== reqUser.email) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  return res.status(200).json(commRequest);
};

exports.findAllByToken = async (req, res) => {
  const reqUser = req.user;

  const CommRequests = await CommRequest.findAll({
    where: {
      [Op.or]: [
        {
          client: reqUser.email,
        },
        {
          advisor: reqUser.email,
        },
      ],
    },
  }).catch((err) => {
    res.status(500).json({
      message: err.message || 'Some error occurred while retrieving the CommRequests.',
    });
  });

  if (!CommRequests) {
    return res.status(404).json({ message: 'No CommRequest found' });
  }

  return res.status(200).json(CommRequests);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const reqUser = req.user;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const commRequest = await CommRequest.findByPk(id);

  if (!commRequest) {
    return res.status(404).json({ message: 'CommRequest not found' });
  }

  if (!reqUser.isAdmin && commRequest.client !== reqUser.email) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  await CommRequest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'CommRequest was updated successfully.',
        });
      } else {
        res.status(500).json({
          message: 'Cannot update CommRequest. Maybe CommRequest was not found or req.body is empty!',
        });
      }
    });
};

exports.delete = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const commRequest = await CommRequest.findByPk(id);

  if (!commRequest) {
    return res.status(404).json({ message: 'CommRequest not found' });
  }

  if (!reqUser.isAdmin && commRequest.client !== reqUser.email) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  await CommRequest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'CommRequest was deleted successfully!',
        });
      } else {
        res.status(500).json({
          message: 'Cannot delete CommRequest. Maybe CommRequest was not found!',
        });
      }
    });
};

/* Message relation */

exports.postMessage = async (req, res) => {
  const email = req.user.id;

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const { commRequestId, content } = req.body;

  if (!commRequestId || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const commRequest = await CommRequest.findByPk(commRequestId);

  if (!commRequest) {
    return res.status(404).json({ message: 'CommRequest not found' });
  }

  if ((!user.isAdmin && commRequest.client !== email) || (user.isAdmin && commRequest.advisor !== email)) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const message = {
    sender: email,
    content: content,
  };

  await Message.create(message)
    .then((data) => {
      commRequest.addMessage(data);
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || 'Some error occurred while creating the Message.',
      });
    });

};

exports.getMessages = async (req, res) => {

  const email = req.user.id;

  const user = await Users.findByPk(email);

  if (!user) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const commRequestId = req.params.id;

  if (!commRequestId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const commRequest = await CommRequest.findByPk(commRequestId);

  if (!commRequest) {
    return res.status(404).json({ message: 'CommRequest not found' });
  }

  if ((!user.isAdmin && commRequest.client !== email) || (user.isAdmin && commRequest.advisor !== email)) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const messages = await commRequest.getMessages();

  if (!messages) {
    return res.status(404).json({ message: 'Messages not found' });
  }

  return res.status(200).json(messages);
};

