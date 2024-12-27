import { Request, Response } from "express";
import logger from "../utils/logger.js";
import { APIResponse } from "../utils/APIResponse.js";
import * as User from "../models/user.model.js";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).send(new APIResponse(200, users, "fetched users successfully"));
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
      accessToken: null,
    });

    // throw error if unable to create user
    if (!user) throw new Error("unable to create user");

    // generate auth token and access token
    const { __auth_token__, __access_token__ } = await User.__generateAuthAndAccessToken__(user);

    // set auth and access token in cookies
    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__auth_token__", __auth_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie("__access_token__", __access_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 10800000),
    });

    // data to be sent to user as response
    const data = { ...user, accessToken: __access_token__, authToken: __auth_token__ };

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
    const { __auth_token__, __access_token__ } = tokens;

    // set auth and access token in headers and cookies
    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__auth_token__", __auth_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    res.cookie("__access_token__", __access_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 10800000),
    });

    // data to be sent to user as response
    const data = {
      ...existingUser,
      password: null,
      accessToken: __access_token__,
      authToken: __auth_token__,
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
    const id = req.user_id;
    await User.updateUser(id, { accessToken: null });

    const __cookie_options__ = { httpOnly: true, secure: true };
    res.clearCookie("accessToken", __cookie_options__);
    res.clearCookie("refreshToken", __cookie_options__);
    res.status(200).send(new APIResponse(200, null, "logout successful"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to logout"));
  }
};

const issueAuthToken = async (req: Request, res: Response) => {
  try {
    const user_id = req.user_id;

    const user = await User.getUserById(user_id);

    if (!user) return res.status(404).send(new APIResponse(404, null, "user not found"));

    const __auth_token__ = User.__generateAuthToken__(user);

    const __cookie_options__ = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("__auth_token__", __auth_token__, {
      ...__cookie_options__,
      expires: new Date(Date.now() + 3600000),
    });

    const data = {
      ...user,
      password: null,
      authToken: __auth_token__,
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
    const { username, phone, bio } = req.body;

    const user: Partial<User.User> = {};
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

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
  issueAuthToken,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
