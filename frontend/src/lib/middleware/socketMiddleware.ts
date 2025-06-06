import { Middleware } from "@reduxjs/toolkit";
import { messageReceived } from "../features/chats/chatsSlice";
import { getSocket } from "../socket";

export const socketMiddleware: Middleware = (store) => {
  const socket = getSocket();

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("chat:message-received", (message) => {
    console.log("Incoming message:", message);
    store.dispatch(messageReceived(message));
  });

  socket.on("chat:message-received-ack", (ackInfo) => {
    console.log("Ack received:", ackInfo);
  });

  return (next) => (action) => {
    return next(action);
  };
};
