import { Router } from "express";
import {
  getAllChats,
  getChat,
  addChatMessage,
  deleteChatMessage,
  createChat,
  deleteChat,
} from "../controllers/chat.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, getAllChats);

router.get("/:id", authenticate, getChat);

router.post("/", authenticate, createChat);

router.post("/message/:id", authenticate, addChatMessage);

router.delete("/message/:id", authenticate, deleteChatMessage);

router.delete("/:id", authenticate, deleteChat);

export default router;
