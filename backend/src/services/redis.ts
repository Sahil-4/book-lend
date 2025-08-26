import Redis from "ioredis";
import logger from "../utils/logger.js";

if (!process.env.REDIS_URL) throw new Error("Invalid REDIS_URL");

const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
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
