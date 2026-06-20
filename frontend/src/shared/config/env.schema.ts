import { z } from 'zod';
import { EnvKey } from './env-key.enum';

export const envSchema = z.object({
  [EnvKey.NextPublicAppUrl]: z.string().url(),
  [EnvKey.NestJsApiUrl]: z.string().url(),
  [EnvKey.JwtCookieName]: z.string().min(1),
  [EnvKey.JwtCookieMaxAge]: z.coerce.number().int().positive(),
  [EnvKey.JwtSecret]: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
