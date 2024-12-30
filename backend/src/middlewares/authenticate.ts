import { NextFunction, Request, Response } from "express";
import { ExtendedError, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils/APIResponse.js";
import * as User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const verifyAccessTokenHttp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const __access_token__ =
      req.cookies?.__access_token__ || req.header("__access_token__")?.replace("Bearer ", "");

    const payload = jwt.verify(__access_token__, String(process.env.JWT_SECRET)) as {
      id: string;
      username: string;
    };

    req.user_id = payload.id;

    next();
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).send(new APIResponse(401, null, "failed to authenticate access token"));
  }
};

export const verifyRefreshTokenHttp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const __refresh_token__ =
      req.cookies?.__refresh_token__ || req.header("__refresh_token__")?.replace("Bearer ", "");

    const payload = jwt.verify(__refresh_token__, String(process.env.JWT_SECRET)) as {
      id: string;
      username: string;
    };

    req.user_id = payload.id;

    const user = await User.__getUser__(payload.id);

    if (!user || user.refreshToken != __refresh_token__) {
      return res.status(401).send(new APIResponse(401, null, "invalid refresh token"));
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).send(new APIResponse(401, null, "failed to authenticate refresh token"));
  }
};

export const verifyAccessTokenSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  try {
    const __access_token__ = String(socket.handshake.headers.__access_token__);

    const payload = jwt.verify(__access_token__, String(process.env.JWT_SECRET)) as {
      id: string;
      username: string;
    };

    socket.data.user_id = payload.id;

    next();
  } catch (error: any) {
    logger.error(error.message);
    return next(new Error("failed to authenticate access token"));
  }
};

export const verifyRefreshTokenSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void,
) => {
  try {
    const __refresh_token__ = String(socket.handshake.headers.__refresh_token__);

    const payload = jwt.verify(__refresh_token__, String(process.env.JWT_SECRET)) as {
      id: string;
      username: string;
    };

    socket.data.user_id = payload.id;

    const user = await User.__getUser__(payload.id);

    if (!user || user.refreshToken != __refresh_token__) {
      return next(new Error("invalid refresh token"));
    }

    next();
  } catch (error: any) {
    logger.error(error.message);
    return next(new Error("failed to authenticate refresh token"));
  }
};
