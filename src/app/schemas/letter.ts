import { z } from 'zod';

export const letterSchema = z
  .string()
  .max(1)
  .regex(/^[a-zA-Z]+$/)
  .or(z.literal(''));

export const wordResponseSchema = z.array(z.string().length(5).regex(/^[a-zA-Z]+$/))