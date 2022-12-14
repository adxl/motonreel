const db = require("../db").db;
const Salon = db.salon;
const Message = db.message;
const Users = db.users;

// TODO : Check if user exists in all the methods
// TODO : Apart from Message methods and findAll, check if user is an admin in all the methods

exports.create = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const { name, userSize } = req.body;

  if (!name || !userSize) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  const salon = {
    name: name,
    userSize: userSize,
  };

  await Salon.create(salon)
    .then((data) => {
      res.status(201).json({ salon: data, message: `Salon ${name} crée !` });
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création du salon.",
      });
    });
};

exports.findAll = async (_, res) => {
  const salons = await Salon.findAll({ include: [Message] });
  return res.status(200).json(salons);
};

exports.findOne = async (req, res) => {
  const { id } = req.params;

  const salon = await Salon.findOne({
    where: { id },
    include: [
      {
        model: Message,
        as: "Messages",
        include: [
          {
            model: Users,
            as: "senderUser",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  return res.status(200).json(salon);
};

exports.update = async (req, res) => {
  console.log(req);
  const reqUser = req.user;
  console.log(
    "ENTER SALON UPDATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  );

  if (!reqUser.isAdmin) {
    return res.status(403).json({ message: "Access denied !" });
  }

  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  const salon = await Salon.findByPk(id);

  if (!salon) {
    return res.status(404).json({ message: "Salon introuvable" });
  }

  await Salon.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: `Le salon a bien été mis à jour avec succès.`,
        });
      } else {
        res.status(500).json({
          message: `Impossible de mettre à jour le salon ${salon.name}. Peut-être que ce salon n'a pas été trouvé ou que req.body est vide !`,
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Erreur de mise à jour du salon",
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
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  const salon = await Salon.findByPk(id);

  if (!salon) {
    return res
      .status(404)
      .json({ message: `Le salon ${salon.name} introuvable ou déjà supprimé` });
  }

  await Salon.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: `Le salon ${salon.name} a bien été supprimé`,
        });
      } else {
        res.status(500).json({
          message: `Impossible de supprimer le salon ${salon.name}. Peut-être qu'il n'a pas été trouvé`,
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: `Impossible de supprimer le salon ${salon.name}.`,
      });
    });
};
