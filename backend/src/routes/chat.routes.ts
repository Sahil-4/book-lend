import { Router } from "express";
import {
  getAllChats,
  getChat,
  addChatMessage,
  deleteChatMessage,
  createChat,
  deleteChat,
} from "../controllers/chat.controllers.js";
import { verifyAccessTokenHttp } from "../middlewares/authenticate.js";

const router = Router();

router.use(verifyAccessTokenHttp);

router.get("/", getAllChats);

router.get("/:id", getChat);

router.post("/", createChat);

router.post("/message/:id", addChatMessage);

router.delete("/message/:id", deleteChatMessage);

router.delete("/:id", deleteChat);

export default router;
