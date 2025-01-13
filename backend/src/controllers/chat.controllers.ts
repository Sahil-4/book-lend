import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { APIResponse } from "../utils/APIResponse.js";
import * as Chat from "../models/chat.model.js";
import * as Message from "../models/message.model.js";
import { broadcastChatMessage } from "../utils/socketEmitters.js";

const getAllChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user_id;
    const chats = await Chat.getAllChats(userId);
    res.status(200).send(new APIResponse(200, chats, "chats fetched"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch chats"));
  }
};

const getMessagesByChatId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const messages = await Message.getMessagesByChatId(id);

    res.status(200).send(new APIResponse(200, messages, "messages fetched"));
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
