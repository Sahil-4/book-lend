import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { APIResponse } from "../utils/APIResponse.js";
import * as Chat from "../models/chat.model.js";
import * as Message from "../models/message.model.js";
import { broadcastChatMessage } from "../utils/socketEmitters.js";

const getAllChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user_id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const chats = await Chat.getAllChats(userId, limit, skip);
    const total = await Chat.getAllChatsCount(userId);
    const meta = { currentPage: page, hasMore: skip + chats.length < total };

    res.status(200).send(new APIResponse(200, chats, "chats fetched", meta));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch chats"));
  }
};

const getMessagesByChatId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const messages = await Message.getMessagesByChatId(id, limit, skip);
    const total = await Message.getMessagesCount(id);
    const meta = { currentPage: page, hasMore: skip + messages.length < total };

    res.status(200).send(new APIResponse(200, messages, "messages fetched", meta));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch messages"));
  }
};

const addChatMessage = async (req: Request, res: Response) => {
  try {
    const senderId = req.user_id;
    const chatId = req.params.id;

    const { type, receiverId, content } = req.body;

    const message = await Message.createMessage({ chatId, senderId, type, receiverId, content });

    res.status(200).send(new APIResponse(200, message, "message added"));

    broadcastChatMessage(message);
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to add message"));
  }
};

const deleteChatMessage = async (req: Request, res: Response) => {
  try {
    const senderId = req.user_id;
    const messageId = req.params.id;

    await Message.deleteMessage(senderId, messageId);

    res.status(200).send(new APIResponse(200, null, "message deleted"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to delete message"));
  }
};

const createChat = async (req: Request, res: Response) => {
  try {
    const participant1 = req.user_id;
    const participant2 = req.body.participant2;

    const chat = await Chat.createChat([participant1, participant2]);

    res.status(200).send(new APIResponse(200, chat, "chat created"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to create chat"));
  }
};

const deleteChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user_id;
    const chatId = req.params.id;

    await Message.deleteAllMessages(userId, chatId);

    res.status(200).send(new APIResponse(200, null, "deleted chat messages"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to delete chat messages"));
  }
};

export {
  getAllChats,
  getMessagesByChatId,
  addChatMessage,
  deleteChatMessage,
  createChat,
  deleteChat,
};
