const { verifyToken } = require("../lib/jwt");
const db = require("../db").db;
const Users = db.users;

function throwTokenError(message = "Token is invalid") {
  throw message;
}

async function getUser(authorization) {
  if (!authorization) {
    throwTokenError();
  }

  const [type, token] = authorization.split(/\s+/);
  if (type !== "Bearer") {
    throwTokenError();
  }

  const payload = await verifyToken(token);
  if (!payload) {
    throwTokenError();
  }

  const user = await Users.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throwTokenError();
  }

  return user;
}

async function auth(req, res, next) {
  try {
    req.user = await getUser(req.headers.authorization);
    return next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(401);
  }
}

const moduleExport = (module.exports = auth);
moduleExport.getUser = getUser;
