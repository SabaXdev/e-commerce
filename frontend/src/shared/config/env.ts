import { EnvKey } from './env-key.enum';
import { envSchema, type Env } from './env.schema';

function parseEnv(): Env {
  const result = envSchema.safeParse({
    [EnvKey.NextPublicAppUrl]: process.env.NEXT_PUBLIC_APP_URL,
    [EnvKey.NestJsApiUrl]: process.env.NESTJS_API_URL,
    [EnvKey.JwtCookieName]: process.env.JWT_COOKIE_NAME,
    [EnvKey.JwtCookieMaxAge]: process.env.JWT_COOKIE_MAX_AGE,
    [EnvKey.JwtSecret]: process.env.JWT_SECRET,
  });

  if (!result.success) {
    throw new Error(`Invalid environment variables: ${result.error.message}`);
  }

  return result.data;
}

export const env = parseEnv();

export const clientEnv = {
  appUrl: env.NEXT_PUBLIC_APP_URL,
} as const;
