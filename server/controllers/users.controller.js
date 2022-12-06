const jwt = require("../lib/jwt");
const bcrypt = require("bcryptjs");

const db = require("../db").db;
const Users = db.users;
const Salon = db.salon;
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

  const user = await Users.findByPk(email);

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
        email: email,
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
  const user = req.user;

  return res.status(200).json(user);
};

exports.findAll = async (req, res) => {
  const reqUser = req.user;

  if (!reqUser.isAdmin) {
    return res.status(401).json({ message: 'Access denied !' });
  }

  const users = await Users.findAll();

  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }

  return res.status(200).json(users);
};

exports.findOne = async (req, res) => {
  const reqUser = req.user;

  const email = req.body.email;

  if (!reqUser.isAdmin) {

    return res.status(200).json(reqUser);

  } else {
    if (!email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await Users.findByPk(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  }
};

exports.update = async (req, res) => {
  const reqUser = req.user;

  await Users.update(req.body, {
    where: { email: reqUser.email },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: 'User was updated successfully.',
        });
      } else {
        res.status(500).json({
          message: 'Cannot update User. Maybe User was not found or req.body is empty!',
        });
      }
    });
};

// QUESTION : Hard or soft delete ?

exports.delete = async (req, res) => {
  const reqUser = req.user;

  await Users.destroy({
    where: { email: reqUser.email },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json({
          message: "User was deleted successfully!",
        });
      } else {
        res.status(500).json({
          message: "Cannot delete User. Maybe User was not found!",
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        message: "Could not delete User",
      });
    });

  //Destroy session
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

  await reqUser.addSalon(salon, {
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

  await reqUser.removeSalon(salon)
    .then(() => {
      return res.status(200).json({ message: "Salon removed from user" });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while removing the Salon.",
      });
    });
};
