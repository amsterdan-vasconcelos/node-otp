import { RequestHandler } from 'express';

export const privateRoute: RequestHandler = (req, res) => {
  res.json({ success: true });
};
