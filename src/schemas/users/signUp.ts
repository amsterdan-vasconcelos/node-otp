import { z } from 'zod';

export const bodySchema = z.object({
  name: z
    .string({ message: 'Campo nome é obrigatório.' })
    .min(3, { message: 'O campo nome deve ter entre 3 á 15 caracteres.' })
    .max(15, { message: 'O campo nome deve ter entre 3 á 15 caracteres.' }),
  email: z
    .string({ message: 'Campo email é obrigatório.' })
    .email({ message: 'Email inválido.' }),
});
