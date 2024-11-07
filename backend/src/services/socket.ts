import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import { authenticateIO } from "../middlewares/authenticate.js";

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
  io.on("connection", (socket) => {
    console.log(`User connected`);
    console.log(`Socket id: ${socket.id}`);
    console.log(`User id: ${socket.data.user_id}`);

    // !TODO - add user in redis - user id to socket id mapping
    // { userid -> socketid }

    // acknowledgement - user connected
    socket.emit("connected", "Connected to the Socket.IO server");

    socket.on("join-chat", (data) => {
      // !TODO - join user a room with chat id
      // add user id in list mapped with chat id in redis
      // { chatId - > { user1 id, user2 id } }
      // if chatid map does not exists create it
    });

    socket.on("leave-chat", (data) => {
      // !TODO - un-join user a room with chat id
      // remove user id from list mapped with chat id in redis
      // chatId - > { user1 id, user2 id }
      // if chatid map contains 0 elements/users delete it from redis
    });

    // !TODO - add this in add new message controller
    // send message to user id or in chat id room
    // io.to(user).emit("message-receive", {});

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // !TODO - remove user from redis - user id to socket id mapping
      // { userid -> socketid } delete it completely
    });
  });
};

const getIOInstance = (): Server => {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
};

export { initiateSocketIO, getIOInstance };
