import { z } from 'zod';

const envSchema = z.object({
    WORDS_API_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const validateEnv = () => {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
}

export const env = validateEnv();