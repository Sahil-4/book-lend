import { Router } from "express";
import {
  getAllNotifications,
  createNotification,
  readNotification,
  deleteNotifications,
} from "../controllers/notification.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { notificationSchema } from "../schema/validationSchema.js";
import { verifyAccessTokenHttp } from "../middlewares/authenticate.js";

const router = Router();

router.use(verifyAccessTokenHttp);

router.get("/", getAllNotifications);

router.post("/", validateRequest(notificationSchema), createNotification);

router.get("/read", readNotification);

router.delete("/", deleteNotifications);

export default router;
