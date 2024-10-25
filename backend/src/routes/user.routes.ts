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
import { userLoginSchema, userSignupSchema } from "../schema/validationSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, getAllUsers);

router.get("/user/:id", authenticate, getUserById);

router.post("/signup", validateRequest(userSignupSchema), signup);

router.post("/login", validateRequest(userLoginSchema), login);

router.get("/logout", authenticate, logout);

router.get("/profile", authenticate, getUserProfile);

router.put("/profile", authenticate, updateUserProfile);

router.delete("/profile", authenticate, deleteUser);

export default router;
