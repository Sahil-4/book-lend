import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimiter, { rateLimiterOptions } from "./middlewares/rateLimiter.js";
import logger, { morganFormat, morganOptions } from "./utils/logger.js";
import { APIResponse } from "./utils/APIResponse.js";
import notificationRoutes from "./routes/notification.routes.js";
import bookRoutes from "./routes/book.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(rateLimiter(rateLimiterOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, morganOptions));

app.get("/", (_: Request, res: Response) => {
  res.status(200).send(new APIResponse(200, null, "server is up"));
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
  logger.info(`Server is started on http://${HOST}:${PORT}`);
});
