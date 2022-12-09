const db = require("../db").db;
const Salon = db.salon;
const Message = db.message;

// TODO : Check if user exists in all the methods
// TODO : Apart from Message methods and findAll, check if user is an admin in all the methods

exports.create = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const { name, userSize } = req.body;

  if (!name || !userSize) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const salon = {
    name: name,
    userSize: userSize,
  };

  await Salon.create(salon)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Salon.",
      });
    });
};

exports.findAll = async (req, res) => {
  const salons = await Salon.findAll({ include: [Message] });

  return res.status(200).json(salons);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const salon = await Salon.findByPk(id);

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  return res.status(200).json(salon);
};

exports.update = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const salon = await Salon.findByPk(id);

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  await Salon.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: "Salon was updated successfully.",
        });
      } else {
        res.status(500).json({
          message:
            "Cannot update Salon. Maybe Salon was not found or req.body is empty!",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Error updating Salon",
      });
    });
};

exports.delete = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const salon = await Salon.findByPk(id);

  if (!salon) {
    return res
      .status(404)
      .json({ message: "Salon not found or already deleted" });
  }

  await Salon.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: "Salon was deleted successfully!",
        });
      } else {
        res.status(500).json({
          message: "Cannot delete Salon. Maybe Salon was not found!",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Could not delete Salon",
      });
    });
};
