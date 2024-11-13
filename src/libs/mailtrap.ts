import { MailtrapClient } from 'mailtrap';

type SendEmail = { to: string; subject: string; body: string };

export const sendEmail = async ({ to, subject, body }: SendEmail) => {
  const client = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN as string,
    testInboxId: 3267277,
  });

  const sender = { email: 'amsterdan@teste.com', name: 'Amsterdan Teste' };

  const recipients = [{ email: to }];

  try {
    await client.testing.send({
      from: sender,
      to: recipients,
      subject,
      text: body,
    });
    return true;
  } catch (error) {
    return false;
  }
};
