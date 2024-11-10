import { RequestHandler } from 'express';
import { usersSchemas } from '../../schemas';
import { z } from 'zod';
import { getUserByEmail } from '../../services/user';

type SignIn = z.infer<typeof usersSchemas.signIn>;

export const signIn: RequestHandler<{}, {}, SignIn> = async (req, res) => {
  const { email } = req.body;

  const data = usersSchemas.signIn.safeParse(email);

  if (!data.success) {
    res
      .status(400)
      .json({ error: { message: data.error.flatten().fieldErrors } });
    return;
  }

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(401).json({ error: { message: 'Este usuário não existe.' } });
    return;
  }
};
