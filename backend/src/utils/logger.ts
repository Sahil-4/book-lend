import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;

// morgan configuration - log format
const morganFormat = ":method :url :status :response-time ms";

// morgan configuration - morgan options
const morganOptions = {
  stream: {
    write: (message: string) => {
      const parts = message.split(" ");
      const logObject = {
        method: parts[0],
        url: parts[1],
        status: parts[2],
        responseTime: `${parts[3]} ms`,
      };

      logger.info(JSON.stringify(logObject));
    },
  },
};

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} : ${level} : ${JSON.parse(message)}`;
  }),
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "application.log" }),
  ],
});

export default logger;
export { morganFormat, morganOptions };
