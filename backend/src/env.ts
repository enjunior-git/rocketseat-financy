import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  JWT_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGIN: z.url(),
});

export const ENV = envSchema.parse(process.env);
