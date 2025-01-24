import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["development", "test ", "production"]),
});

const { data, success, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error("Invalid environment variable", error.format());
  throw new Error("Invalid environment variable");
}

export const env = data;
