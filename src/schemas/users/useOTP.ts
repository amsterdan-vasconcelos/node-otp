import { z } from 'zod';

export const bodySchema = z.object({
  id: z.string({ message: 'Campo obrigatório.' }),
  code: z
    .string({ message: 'Campo obrigatório.' })
    .length(6, { message: 'Código Inválido.' }),
});
