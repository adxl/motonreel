const db = require("../db").db;
const CommRequest = db.commRequest;
const Users = db.users;

// TODO : Check if user exists in all the methods
// TODO : Apart from create, check if user is the client or the advisor in all the methods

exports.create = async (req, res) => {
  const { advisor } = req.body;
  const reqUser = req.user;

  if (!advisor) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const advisorUser = await Users.findByPk(advisor);

  if (!advisorUser) {
    return res.status(404).json({ message: "Advisor not found" });
  }

  if (!advisorUser.disponibility) {
    return res.status(400).json({ message: "Advisor not available" });
  }

  const commRequest = {
    status: "a57014e4-19bd-471c-979a-1c77cc16ad4a",
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
      include: [
        {
          model: db.users,
          as: "advisorUser",
          attributes: ["name"],
        },
        {
          model: db.CommRequestStatus,
          as: "requestStatus",
          attributes: ["name"],
        },
      ],
    }).catch((err) => {
      return res.status(500).json({
        message:
          err.message ||
          "Some error occurred while retrieving the CommRequests.",
      });
    });

    return res.status(200).json(commRequests);
  }

  const commRequests = await CommRequest.findAll({
    where: { advisor: reqUser.id },
    include: [
      {
        model: db.users,
        as: "clientUser",
        attributes: ["name"],
      },
      {
        model: db.CommRequestStatus,
        as: "requestStatus",
        attributes: ["name"],
      },
    ],
  });

  return res.status(200).json(commRequests);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;
  const id = req.params.id;

  if (!reqUser.isAdmin) {
    const commRequest = await CommRequest.findByPk(id, {
      include: [
        {
          model: db.users,
          as: "advisorUser",
          attributes: ["name"],
        },
      ],
    });

    if (!commRequest) {
      return res.status(404).json({ message: "CommRequest not found" });
    }

    if (commRequest.client !== reqUser.id) {
      return res.status(403).json({ message: "Access denied !" });
    }
  }

  const commRequest = await CommRequest.findByPk(id, {
    include: [
      {
        model: db.users,
        as: "clientUser",
        attributes: ["name"],
      },
    ],
  });

  if (!commRequest) {
    return res.status(404).json({ message: "CommRequest not found" });
  }

  if (commRequest.advisor !== reqUser.id) {
    return res.status(403).json({ message: "Access denied !" });
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
    return res.status(403).json({ message: "Access denied !" });
  }

  /**
   * Status can only be 1: "En attente", 2: "Acceptée", 3: "Refusée" or 4: "Résolue"
   */
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
