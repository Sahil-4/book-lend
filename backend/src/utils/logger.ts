import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize, printf } = format;

// morgan configuration - log format
const morganFormat = ":method :url :status :response-time ms";

// morgan configuration - morgan options
const morganOptions = {
  stream: {
    write: (message: string) => {
      logger.info(message.trim());
    },
  },
};

// Custom format for console logging with colors
const consoleLogFormat = combine(
  colorize(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} : [${level}] : ${message}`;
  }),
);

// Create a Winston logger
const logger = createLogger({
  level: "info",
  format: combine(timestamp()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ 
      filename: "application.log",
      format: combine(timestamp(), json()),
     }),
  ],
});

export default logger;
export { morganFormat, morganOptions };
