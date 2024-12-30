import { Router } from "express";
import {
  login,
  signup,
  logout,
  issueAccessToken,
  getAllUsers,
  getUserById,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controllers.js";
import { userLoginSchema, userSignupSchema } from "../schema/validationSchema.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { verifyAccessTokenHttp, verifyRefreshTokenHttp } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", verifyAccessTokenHttp, getAllUsers);

router.get("/user/:id", verifyAccessTokenHttp, getUserById);

router.post("/signup", validateRequest(userSignupSchema), signup);

router.post("/login", validateRequest(userLoginSchema), login);

router.get("/logout", logout);

router.get("/authtoken", verifyRefreshTokenHttp, issueAccessToken);

router.get("/profile", verifyAccessTokenHttp, getUserProfile);

router.put("/profile", verifyAccessTokenHttp, updateUserProfile);

router.delete("/profile", verifyAccessTokenHttp, verifyRefreshTokenHttp, deleteUser);

export default router;
