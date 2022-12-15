const { Op } = require("sequelize");

const db = require("../db").db;
const RendezVous = db.rendezVous;
const RendezVousType = db.rendezVousType;

// TODO : Check if user exists in all the methods
// TODO : Apart from create, check if the user is the client of the rendezVous

exports.create = async (req, res) => {
  const reqUser = req.user;
  const { type, date } = req.body;

  if (!type || !date) {
    return res.status(400).json({ message: "Champs obligatoires manquants" });
  }

  const rendezVousType = await RendezVousType.findByPk(type);

  if (!rendezVousType) {
    return res.status(404).json({ message: "Rendez-vous introuvable" });
  }

  const rendezVous = {
    type: type,
    date: date,
    client: reqUser.id,
  };

  await RendezVous.create(rendezVous)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message:
          err.message ||
          "Une erreur s'est produite lors de la création du rendez-vous.",
      });
    });
};

exports.findAll = async (req, res) => {
  // const type = req.query.type;

  if (req.user.isUser) {
    const rendezVous = await RendezVous.findAll({
      where: {
        [Op.and]: [{ client: req.user.id }, { date: { [Op.gte]: Date() } }],
      },
      order: [["date", "ASC"]],
      attributes: { exclude: ["client"] },
      include: [
        {
          model: db.rendezVousType,
          as: "rdvType",
          attributes: ["name"],
        },
      ],
    });

    return res.status(200).json(rendezVous);
  }

  const rendezVous = await RendezVous.findAll({
    where: { date: { [Op.gte]: Date() } },
    order: [["date", "ASC"]],
    include: [
      {
        model: db.rendezVousType,
        as: "rdvType",
        attributes: ["name"],
      },
      {
        model: db.users,
        as: "rdvClient",
        attributes: ["name"],
      },
    ],
  });

  return res.status(200).json(rendezVous);
};
