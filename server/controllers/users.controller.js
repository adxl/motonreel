const jwt = require("../lib/jwt");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const db = require("../db").db;
const Users = db.users;
const Salon = db.salon;
const CommRequest = db.commRequest;
const SalonController = require("./salon.controller");

// TODO : Apart from create, connected user access

exports.create = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Des champs sont manquants" });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email: email,
    password: hashedPassword,
    name: name,
    isAdmin: false,
    disponibility: false,
  };

  user.token = await jwt.createToken(user);

  await Users.create(user)
    .then(({ token }) => {
      res.status(201).json({ token });
    })
    .catch(() => {
      res.status(400).json({
        message: "Cette adresse email est déjà utilisée",
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: `Champs obligatoires manquants ${email} ${password}` });
  }

  const user = await Users.findOne({ where: { email: email } });

  if (!user) {
    return res.status(401).json({
      message: "Vos identifiants sont incorrects",
    });
  }

  const same = await bcrypt.compare(password, user.password);

  if (!same) {
    return res.status(401).json({
      message: "Vos identifiants sont incorrects",
    });
  }

  const token = await jwt.createToken(user);

  await Users.update(
    { token: token },
    {
      where: {
        id: user.id,
      },
    }
  ).then((num) => {
    if (num == 1) {
      return res.status(200).json({ token });
    } else {
      return res.status(500).json({
        message: `Impossible de mettre à jour l'utilisateur avec email=${email}. Peut-être que l'utilisateur n'a pas été trouvé ou que req.body est vide.!`,
      });
    }
  });
};

exports.findOneByToken = async (req, res) => {
  return res.status(200).json(req.user);
};

exports.findAdvisors = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    const advisors = await Users.findAll({
      where: {
        isAdmin: true,
        disponibility: true,
      },
    });

    const commRequests = await CommRequest.findAll({
      where: {
        client: reqUser.id,
      },
    });

    const filteredAdvisors = advisors.filter((advisor) => {
      const result = commRequests.find(
        (commRequest) =>
          commRequest.advisor === advisor.id &&
          (commRequest.status === "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c" ||
            commRequest.status === "a57014e4-19bd-471c-979a-1c77cc16ad4a")
      );

      if (result) {
        return false;
      }

      return true;
    });

    return res.status(200).json(filteredAdvisors);
  }

  const advisors = await Users.findAll({
    where: {
      isAdmin: true,
      [Op.not]: { id: reqUser.id },
    },
    attributes: { exclude: ["password", "token"] },
  });

  return res.status(200).json(advisors);
};

exports.update = async (req, res) => {
  const reqUser = req.user;

  await Users.update(
    { disponibility: req.body.disponibility },
    {
      where: { id: reqUser.id },
    }
  ).then((num) => {
    if (num == 1) {
      res.status(200).json({
        message: "User was updated successfully.",
      });
    } else {
      res.status(500).json({
        message:
          "Cannot update User. Maybe User was not found or req.body is empty!",
      });
    }
  });
};

exports.findAll = async (req, res) => {
  const reqUser = req.user;

  const users = await Users.findAll({
    where: {
      id: {
        [Op.ne]: reqUser.id,
      },
    },
    attributes: ["name", "id"],
  });

  return res.status(200).json(users);
};

/* Salon relation */

exports.addSalon = async (req, res) => {
  const reqUser = req.user;
  const salonId = req.body;

  if (!salonId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const salon = await Salon.findByPk(salonId);

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  const totalSalonUsers = await SalonController.getUsers(salonId);

  if (totalSalonUsers >= salon.userSize) {
    return res.status(400).json({ message: "Salon is full" });
  }

  await reqUser
    .addSalon(salon, {
      through: { joined: new Date() },
    })
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while adding the Salon.",
      });
    });
};

exports.removeSalon = async (req, res) => {
  const reqUser = req.user;
  const salonId = req.body;

  if (!salonId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const salon = await Salon.findByPk(salonId);

  if (!salon) {
    return res.status(404).json({ message: "Salon not found" });
  }

  await reqUser
    .removeSalon(salon)
    .then(() => {
      return res.status(200).json({ message: "Salon removed from user" });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while removing the Salon.",
      });
    });
};
