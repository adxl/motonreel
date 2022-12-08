const db = require("../db").db;
const CommRequest = db.commRequest;
const Users = db.users;
const Message = db.message;

// TODO : Check if user exists in all the methods
// TODO : Apart from create, check if user is the client or the advisor in all the methods

exports.create = async (req, res) => {
  const { status, advisor } = req.body;
  const reqUser = req.user;

  if (!status || !advisor) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const advisorUser = await Users.findOne({
    where: {
      disponibility: true,
      id: advisor,
    },
  });

  if (!advisorUser) {
    return res.status(404).json({ message: "Advisor not found" });
  }

  if (!advisor.disponibility) {
    return res.status(400).json({ message: "Advisor not available" });
  }

  const commRequest = {
    status: status,
    client: reqUser.id,
    advisor: advisor,
  };

  await CommRequest.create(commRequest)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the CommRequest.",
      });
    });
};

exports.findAll = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    const commRequests = await CommRequest.findAll({
      where: { client: reqUser.id },
    }).catch((err) => {
      return res.status(500).json({
        message:
          err.message ||
          "Some error occurred while retrieving the CommRequests.",
      });
    });

    return res.status(200).json(commRequests);
  }

  const commRequests = await CommRequest.findAll();

  return res.status(200).json(commRequests);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  const commRequest = await CommRequest.findByPk(id);

  if (!commRequest) {
    return res.status(404).json({ message: "CommRequest not found" });
  }

  if (
    (!reqUser.isAdmin && commRequest.client !== reqUser.id) ||
    (reqUser.isAdmin && commRequest.advisor !== reqUser.id)
  ) {
    return res.status(401).json({ message: "Access denied !" });
  }

  return res.status(200).json(commRequest);
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const reqUser = req.user;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const commRequest = await CommRequest.findByPk(id);

  if (!commRequest) {
    return res.status(404).json({ message: "CommRequest not found" });
  }

  if (
    !reqUser.isAdmin ||
    (reqUser.isAdmin && commRequest.advisor !== reqUser.id)
  ) {
    return res.status(401).json({ message: "Access denied !" });
  }

  await CommRequest.update(
    { status: req.body.status },
    {
      where: { id: id },
    }
  ).then((num) => {
    if (num == 1) {
      res.status(200).json({
        message: "CommRequest was updated successfully.",
      });
    } else {
      res.status(500).json({
        message:
          "Cannot update CommRequest. Maybe CommRequest was not found or req.body is empty!",
      });
    }
  });
};
