import { Router } from "express";
import {
  login,
  signup,
  logout,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, getAllUsers);

router.get("/user/:id", authenticate, getUserById);

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", authenticate, logout);

router.get("/profile", authenticate, getUserProfile);

router.put("/profile", authenticate, updateUserProfile);

router.delete("/profile", authenticate, deleteUser);

export default router;
