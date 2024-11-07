import app from "./app.js";
import { initiateSocketIO } from "./services/socket.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const httpServer = app.listen(PORT, () => {
  logger.info(`Server is started on http://${HOST}:${PORT}`);
});

initiateSocketIO(httpServer);
