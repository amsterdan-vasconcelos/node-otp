import { RequestHandler } from 'express';
import { verifyJWT } from '../libs/jwt';

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: 'Não autorizado.' });
    return;
  }

  const token = req.headers.authorization.split(' ')[1];

  const isValidToken = verifyJWT(token);

  if (!isValidToken) {
    res.status(401).json({ error: 'INVALID_TOKEN' });
  }

  next();
};
