import { Request, Response } from "express";
import logger from "../utils/logger.js";
import * as Notification from "../models/notification.model.js";
import { APIResponse } from "../utils/APIResponse.js";

const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const notifications = await Notification.getAllNotifications(id);

    res.status(200).send(new APIResponse(200, notifications, "fetched notifications"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch notifications"));
  }
};

const createNotification = async (req: Request, res: Response) => {
  try {
    const user_id = req.user_id;
    const { type, content } = req.body;

    const notification = await Notification.createNotification({ userId: user_id, type, content });
    res.status(200).send(new APIResponse(200, notification, "notification created"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch notifications"));
  }
};

const readNotification = async (req: Request, res: Response) => {
  try {
    const user_id = req.user_id;

    await Notification.markReadNotification(user_id);
    res.status(200).send(new APIResponse(200, null, "marked notifications read "));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to mark notifications read"));
  }
};

const deleteNotifications = async (req: Request, res: Response) => {
  try {
    const user_id = req.user_id;
    const notification_id = req.params.id;

    await Notification.deleteNotification(user_id, notification_id);
    res.status(200).send(new APIResponse(200, null, "notification deleted "));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to delete notifications"));
  }
};

export { getAllNotifications, createNotification, readNotification, deleteNotifications };
