import { RequestHandler } from 'express';
import { usersSchemas } from '../../schemas';
import { z } from 'zod';
import { getUserByEmail } from '../../services/user';
import { generateOTP } from '../../services/opt';
import { sendEmail } from '../../libs/mailtrap';
import { validation } from '../../middlewares/validation';

const { bodySchema } = usersSchemas.signIn;
export const signInValidator = validation({ body: bodySchema });
type SignIn = z.infer<typeof bodySchema>;

export const signIn: RequestHandler<{}, {}, SignIn> = async (req, res) => {
  const { email } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(401).json({ error: { message: 'Este usuário não existe.' } });
    return;
  }

  const otp = await generateOTP(user.id);

  await sendEmail({
    to: user.email,
    subject: 'Seu código de acesso é:',
    body: otp.code,
  });

  res.status(200).json({ id: otp.id });
};
