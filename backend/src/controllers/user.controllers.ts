import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {};

const getUserById = async (req: Request, res: Response) => {};

const signup = async (req: Request, res: Response) => {};

const login = async (req: Request, res: Response) => {};

const logout = async (req: Request, res: Response) => {};

const getUserProfile = async (req: Request, res: Response) => {};

const updateUserProfile = async (req: Request, res: Response) => {};

const deleteUser = async (req: Request, res: Response) => {};

export {
  getAllUsers,
  getUserById,
  login,
  signup,
  logout,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
