import jwt from 'jsonwebtoken';

const key = process.env.JWT_SECRET || 'mysecret';

// JWT Helpers
const generateLoginToken = (user, expiration) => {
  const { _id, email } = user;
  const payload = {
    _id,
    email,
    iss: 'Large',
  };
  return jwt.sign(payload, key, expiration);
};

const generateRefreshToken = (user, expiration) => {
  const { _id } = user;
  const payload = {
    _id,
    iss: 'Large',
  };
  return jwt.sign(payload, key, expiration);
};

export default {
  generateLoginToken,
  generateRefreshToken,
};
