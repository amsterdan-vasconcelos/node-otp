import jwt from 'jsonwebtoken';

export const createJWT = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string);
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded;
  } catch (error) {
    return false;
  }
};
