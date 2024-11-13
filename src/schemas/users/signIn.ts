import { z } from 'zod';

export const bodySchema = z.object({
  email: z
    .string({ message: 'Campo email é obrigatório.' })
    .email({ message: 'Email inválido.' }),
});
