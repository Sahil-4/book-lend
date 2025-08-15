import rateLimiter from "express-rate-limit";

const rateLimiterOptions = {
  windowMs: 15 * 60 * 1000,
  max: 2700,
  message: "Too many requests from this IP, please try again after 15 minutes.",
};

export default rateLimiter;
export { rateLimiterOptions };
