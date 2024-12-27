import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { APIResponse } from "../utils/APIResponse.js";
import * as User from "../models/user.model.js";
import { ExtendedError, Socket } from "socket.io";

const verifyToken = (token: string) => {
  try {
    // -1 : invalid auth token
    // 0 : expired auth token
    // user id : valid auth token
    const __JWT_SECRET__ = String(process.env.JWT_SECRET);
    const __payload__ = jwt.verify(token, __JWT_SECRET__) as { id: string };
    return __payload__.id;
  } catch (error: any) {
    if (error.name == "TokenExpiredError") return "0";
    return "-1";
  }
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const __auth_token__ =
      req.cookies?.__auth_token__ || req.header("__auth_token__")?.replace("Bearer ", "");
    const __access_token__ =
      req.cookies?.__access_token__ || req.header("__access_token__")?.replace("Bearer ", "");

    if (!__auth_token__ || !__access_token__) {
      return res.status(401).send(new APIResponse(401, null, "invalid auth token"));
    }

    // verify tokens
    const authRes = verifyToken(__auth_token__);
    const accessRes = verifyToken(__access_token__);

    if (authRes === "0" || accessRes === "0") {
      return res.status(401).send(new APIResponse(401, null, "token expired"));
    }

    if (authRes === "-1" || accessRes === "-1") {
      return res.status(401).send(new APIResponse(401, null, "invalid auth token"));
    }

    if (authRes != accessRes) {
      return res.status(401).send(new APIResponse(401, null, "invalid auth token"));
    }

    const user = await User.getUserById(authRes);

    if (!user) {
      return res.status(401).send(new APIResponse(401, null, "invalid auth token"));
    }

    req.user_id = user.id;

    next();
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).send(new APIResponse(401, null, "failed to authenticate"));
  }
};

export const authenticateIO = async (socket: Socket, next: (err?: ExtendedError) => void) => {
  try {
    const __auth_token__ = String(socket.handshake.headers.__auth_token__);
    const __access_token__ = String(socket.handshake.headers.__access_token__);

    if (!__auth_token__ || !__access_token__) {
      return next(new Error("failed to authenticate"));
    }

    // verify tokens
    const authRes = verifyToken(__auth_token__);
    const accessRes = verifyToken(__access_token__);

    if (authRes === "0" || accessRes === "0") {
      next(new Error("token expired"));
    }

    if (authRes === "-1" || accessRes === "-1") {
      next(new Error("invalid auth token"));
    }

    if (authRes != accessRes) {
      next(new Error("invalid auth token"));
    }

    const user = await User.getUserById(authRes);

    if (!user) {
      next(new Error("invalid auth token"));
    }

    socket.data.user_id = user?.id;

    next();
  } catch (error: any) {
    logger.error(error.message);
    return next(new Error("failed to authenticate"));
  }
};

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const __access_token__ =
      req.cookies?.__access_token__ || req.header("__access_token__")?.replace("Bearer ", "");

    if (!__access_token__) {
      return res.status(401).send(new APIResponse(401, null, "invalid access token"));
    }

    // verify tokens
    const accessRes = verifyToken(__access_token__);

    if (accessRes === "0") {
      return res.status(401).send(new APIResponse(401, null, "token expired"));
    }

    if (accessRes === "-1") {
      return res.status(401).send(new APIResponse(401, null, "invalid access token"));
    }

    const user = await User.getUserById(accessRes);

    if (!user) {
      return res.status(401).send(new APIResponse(401, null, "user not found"));
    }

    req.user_id = user.id;

    next();
  } catch (error: any) {
    logger.error(error.message);
    res.status(401).send(new APIResponse(401, null, "failed to authenticate"));
  }
};
