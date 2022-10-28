const jwt = require('jsonwebtoken');

exports.createToken = async (user) => {
  const payload = {
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.verifyToken = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    return {
      email: decoded.email,
      name: decoded.name,
      isAdmin: decoded.isAdmin,
    };
  } catch (error) {
    return false;
  }
};
