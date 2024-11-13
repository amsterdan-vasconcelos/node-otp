import { RequestHandler } from 'express';
import { usersSchemas } from '../../schemas';
import { z } from 'zod';
import { validation } from '../../middlewares/validation';
import { validateOTP } from '../../services/opt';
import { createJWT } from '../../libs/jwt';

const { bodySchema } = usersSchemas.useOTP;
export const useOTPValidator = validation({ body: bodySchema });
type BodyProps = z.infer<typeof bodySchema>;

export const useOTP: RequestHandler<{}, {}, BodyProps> = async (req, res) => {
  const { id, code } = req.body;

  const user = await validateOTP(id, code);

  if (!user) {
    res.status(401).json({ error: 'Código inválido ou expirado.' });
    return;
  }

  const token = createJWT(user.id);

  res.status(200).json({ user, token });
};
