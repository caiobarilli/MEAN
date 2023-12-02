import jwt from 'jsonwebtoken';

const generateAccessToken = (userId: string, userRole): string => {
  const payload = {
    id: userId,
    role: userRole
  };

  const accessToken = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: '1h'
  });
  return accessToken;
};

export default generateAccessToken;
