import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { authenticateIO } from "../middlewares/authenticate.js";
import redis from "./redis.js";

let io: Server | null = null;

const initiateSocketIO = (httpServer: HttpServer) => {
  // new socket io instance
  io = new Server(httpServer, {
    pingTimeout: 60000,
    path: "/live/chat",
  });

  // authentication
  io.use(authenticateIO);

  // handle session
  io.on("connection", async (socket) => {
    // add user in redis - user id to socket id mapping
    await redis.set(`user:${socket.data.user_id}:socket`, socket.id);

    // acknowledgement - user connected
    socket.emit("connected", "Connected to the Socket.IO server");

    // join room with chatId
    socket.on("join-chat", async (data) => {
      const { chatId } = data;

      socket.join(chatId);
      // add user and room details in redis
      await redis.sadd(`chat:${chatId}:users`, socket.data.user_id);
    });

    // leave room with chatId
    socket.on("leave-chat", async (data) => {
      const { chatId } = data;

      socket.leave(chatId);
      await redis.srem(`chat:${chatId}:users`, socket.data.user_id);

      // delete chatId room info if there are no users
      const remainingUsers = await redis.scard(`chat:${chatId}:users`);
      if (remainingUsers === 0) {
        await redis.del(`chat:${chatId}:users`);
      }
    });

    // delete user from redis
    socket.on("disconnect", async () => {
      await redis.del(`user:${socket.data.user_id}:socket`);
    });
  });
};

const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};

export { initiateSocketIO, getIOInstance };
