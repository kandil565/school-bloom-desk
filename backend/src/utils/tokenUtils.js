import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
  } catch (error) {
    return null;
  }
};
