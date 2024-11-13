import { RequestHandler } from 'express';
import { usersSchemas } from '../../schemas';
import { createUser, getUserByEmail } from '../../services/user';
import { validation } from '../../middlewares/validation';
import { object, z } from 'zod';

const { bodySchema } = usersSchemas.signUp;
export const signUpValidator = validation({ body: bodySchema });
type BodyProps = z.infer<typeof bodySchema>;
type SignUp = RequestHandler<{}, {}, BodyProps>;

export const signUp: SignUp = async (req, res) => {
  const data = req.body;

  const user = await getUserByEmail(data.email);

  if (user) {
    res
      .status(400)
      .json({ error: { message: 'Este email já está sendo utilizado.' } });
    return;
  }

  const userCreated = await createUser(data);

  if (userCreated instanceof Error) {
    res.status(500).json({ error: { message: userCreated.message } });
    return;
  }

  res.status(201).json({ ...userCreated });
};
