import { Router } from "express";
import {
  getAllNotifications,
  createNotification,
  readNotification,
  deleteNotifications,
} from "../controllers/notification.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", getAllNotifications);

router.post("/", createNotification);

router.get("/read", readNotification);

router.delete("/", deleteNotifications);

export default router;
