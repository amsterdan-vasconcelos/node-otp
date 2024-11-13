import { prisma } from '../libs/prisma';

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
};

type Create = {
  name: string;
  email: string;
};

export const createUser = async (data: Create) => {
  try {
    const user = await prisma.user.create({ select: { id: true }, data });
    return user;
  } catch (error) {
    return new Error('Ocorreu um erro interno.');
  }
};
