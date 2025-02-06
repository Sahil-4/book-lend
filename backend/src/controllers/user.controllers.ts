import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";
import { APIResponse } from "../utils/APIResponse.js";
import * as User from "../models/user.model.js";
import { uploadToCloudinary } from "../services/cloudinary.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.getAllUsers(limit, skip);
    const total = await User.getAllUsersCount();
    const meta = { currentPage: page, hasMore: skip + users.length < total };

    res.status(200).send(new APIResponse(200, users, "fetched users successfully", meta));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to fetch users"));
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.getUserById(id);
    res.status(200).send(new APIResponse(200, user, "fetched user successfully"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to fetch user"));
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    // extract details from request body
    const body = req.body;
    const { username, name, phone, bio, password } = body;

    // check if user already exists
    const existingUser = await User.getUserByUsernameORPhone(username, phone);
    if (existingUser) {
      return res
        .status(409)
        .send(new APIResponse(409, null, "user with username or phone already exists"));
    }

    // hash password
    const hashed_password = await User.__hashPassword__(password);

    // create new user
    const user = await User.createUser({
      username,
      avatar: null,
      name,
      phone,
      bio,
      password: hashed_password,
      refreshToken: null,
    });

    // throw error if unable to create user
    if (!user) throw new Error("unable to create user");

    // generate auth token and access token
    const { __access_token__, __refresh_token__ } = await User.__generateAuthAndAccessToken__(user);

    // set auth and access token in cookies
    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__access_token__", __access_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie("__refresh_token__", __refresh_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 10800000),
    });

    // data to be sent to user as response
    const data = { ...user, refreshToken: __refresh_token__, accessToken: __access_token__ };

    // return response
    res.status(200).send(new APIResponse(200, data, "signup successful"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to signup"));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const { username, phone, password } = body;

    // check if user does not exists
    const existingUser = await User.__getUserByUsernameORPhone__(username, phone);
    if (!existingUser) {
      return res.status(404).send(new APIResponse(404, null, "user not found"));
    }

    // check password
    const result = await User.__matchUserPassword__(password, existingUser.password);

    if (!result) {
      return res.status(401).send(new APIResponse(401, null, "failed to authenticate"));
    }

    // generate auth token and access token
    const tokens = await User.__generateAuthAndAccessToken__(existingUser);
    const { __access_token__, __refresh_token__ } = tokens;

    // set auth and access token in headers and cookies
    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__access_token__", __access_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie("__refresh_token__", __refresh_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 10800000),
    });

    // data to be sent to user as response
    const data = {
      ...existingUser,
      password: null,
      refreshToken: __refresh_token__,
      accessToken: __access_token__,
    };

    // return response
    res.status(200).send(new APIResponse(200, data, "login successful"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to login"));
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const __refresh_token__ =
      req.cookies?.__refresh_token__ || req.header("__refresh_token__")?.replace("Bearer ", "");

    const payload = jwt.decode(__refresh_token__) as {
      id: string;
      username: string;
      iat: number;
      exp: number;
    };

    const id = payload.id;

    await User.updateUser(id, { refreshToken: null });

    const __cookie_options__ = { httpOnly: true, secure: true };
    res.clearCookie("__access_token__", __cookie_options__);
    res.clearCookie("__refresh_token__", __cookie_options__);
    res.status(200).send(new APIResponse(200, null, "logout successful"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to logout"));
  }
};

const issueAccessToken = async (req: Request, res: Response) => {
  try {
    const user_id = req.user_id;

    const user = await User.getUserById(user_id);

    if (!user) return res.status(404).send(new APIResponse(404, null, "user not found"));

    const __access_token__ = User.__generateAccessToken__(user);

    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__access_token__", __access_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    const __refresh_token__ =
      req.cookies?.__refresh_token__ || req.header("__refresh_token__")?.replace("Bearer ", "");

    const data = {
      ...user,
      password: null,
      accessToken: __access_token__,
      refreshToken: __refresh_token__,
    };

    res.status(200).send(new APIResponse(200, data, "auth token updated"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to update auth token"));
  }
};

const getUserProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    const user = await User.getUserById(id);
    res.status(200).send(new APIResponse(200, user, "fetched user profile successfully"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to fetch user profile"));
  }
};

const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;

    // data to update - only these can be updated
    const { name, bio } = req.body;

    const avatarFilePath = req.file?.path;

    const avatar = avatarFilePath ? await uploadToCloudinary(avatarFilePath, "avatar") : null;

    const user: Partial<User.User> = {};
    // if (phone) user.phone = phone;
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    // update user
    const updatedUser = await User.updateUser(id, user);

    res.status(200).send(new APIResponse(200, updatedUser, "profile updated"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to update user profile"));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.user_id;
    await User.deleteUser(id);
    res.status(200).send(new APIResponse(200, null, "deleted user successfully"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "unable to delete user"));
  }
};

export {
  getAllUsers,
  getUserById,
  login,
  signup,
  logout,
  issueAccessToken,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
