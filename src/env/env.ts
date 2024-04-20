import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(5000),
  MONGODB_CONNECTION_STRING: z.string().default('mongodb://127.0.0.1'),
  MONGODB_DATABASE: z.string(),
  BASE_URL: z.string(),
  BASE_URL_CLIENT: z.string(),
  JWT_SECRET: z.string(),
});
export type Env = z.infer<typeof envSchema>;
