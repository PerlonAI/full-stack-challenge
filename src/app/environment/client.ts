import { z } from 'zod';

const clientEnvSchema = z.object({
    NEXT_PUBLIC_VALIDATE_WORD_API_URL: z.string().url().default('http://localhost:3000/api/words'),
});

const validateClientEnv = () => {
    const parsed = clientEnvSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
}


export const env = validateClientEnv();
