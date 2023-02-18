const jwt = require('jsonwebtoken');

const generateWebToken = function (data) {
  const token = jwt.sign(
    {
      expiresIn: '1d',
      data,
    },
    'UR6YKRyMrz'
  );
  return token;
};
module.exports = generateWebToken;
