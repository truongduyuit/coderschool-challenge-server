import redis, { Redis } from "ioredis";
import { ConfigEnv } from "../configs";

export class RedisService {
  private static instance: RedisService;
  private client: Redis;

  private constructor() {
    this.client = new redis(+ConfigEnv.REDIS_PORT, ConfigEnv.REDIS_HOST, {
      username: ConfigEnv.REDIS_USER,
      password: ConfigEnv.REDIS_PASSWORD,
    });

    this.client.on("connect", function () {
      console.log(`Connected to redis: ${ConfigEnv.REDIS_HOST}`);
    });

    this.client.on("error", (error: any) => {
      console.error(`Redis client error: ${error}`);
    });
  }

  static getInstance(): Redis {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance.client;
  }
}
