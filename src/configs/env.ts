import dotenv from "dotenv";
dotenv.config();

export const ConfigEnv = {
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "3d",
  REFRESH_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "7d",

  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING ?? "",

  REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING ?? "",
  REDIS_HOST: process.env.REDIS_HOST ?? "",
  REDIS_PORT: process.env.REDIS_PORT ?? 6379,
  REDIS_USER: process.env.REDIS_USER ?? "REDIS_USER",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? "",
};
