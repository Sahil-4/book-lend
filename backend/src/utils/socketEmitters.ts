import { Message } from "../models/message.model.js";
import redis from "../services/redis.js";
import { getIOInstance } from "../services/socket.js";
import logger from "./logger.js";

export const broadcastChatMessage = async (message: Message) => {
  try {
    // send message to chatId room (1)
    // and to senderId user's socket id (2) - whichever is available

    const { senderId, receiverId, chatId } = message;

    // get socket id of message receiver
    const receiverSocketId = await redis.get(`user:${receiverId}:socket`);

    // if user is not online
    if (!receiverSocketId) {
      return;
    }

    const io = getIOInstance();

    // get socket id of message sender
    const senderSocketId = await redis.get(`user:${senderId}:socket`);

    // get chat (users in chat)
    const chat = await redis.get(`chat:${chatId}:users`);

    if (chat && chat.length === 2) {
      // if both participants are in chat - both has joined room
      io.in(chatId).emit("chat:message-received", message);
    } else {
      // if user is just online but has not opened chat
      io.to(receiverSocketId).emit("chat:message-received", message);
    }

    io.to(senderSocketId!).emit("chat:message-received-ack", "message delivered");
  } catch (error) {
    logger.error(error);
  }
};
