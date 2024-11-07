import Redis from "ioredis";
import logger from "../utils/logger.js";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  password: process.env.REDIS_PASSWORD,
  connectTimeout: 10000,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

redis.on("connect", () => {
  logger.info("redis connected");
});

redis.on("error", (error: any) => {
  logger.error(error.message);
});

process.on("SIGINT", () => {
  redis.quit(() => {
    logger.info("redis connection closed");
    process.exit(0);
  });
});

export default redis;
