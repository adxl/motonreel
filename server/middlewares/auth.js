const { verifyToken } = require('../lib/jwt');
const { User } = require('../db');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.sendStatus(401);
  }

  const [type, token] = header.split(/\s+/);
  if (type !== 'Bearer') {
    return res.sendStatus(401);
  }

  const user = await verifyToken(token);
  if (user) {
    req.user = await User.findByPk(
      user.email,
      {
        // permet de récupérer des données de jointure
        // include: [],
      },
    );

    if (!req.user) return res.sendStatus(404);

    return next();
  }

  return res.sendStatus(401);
};
