import { z } from 'zod';

const serverEnvSchema = z.object({
    WORDS_API_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

const validateServerEnv = () => {
    const parsed = serverEnvSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
}

export const env = validateServerEnv();