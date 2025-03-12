import { z } from 'zod';

export const letterSchema = z
  .string()
  .max(1)
  .regex(/^[a-zA-Z]+$/)
  .or(z.literal(''));
