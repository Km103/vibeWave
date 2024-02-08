import { Router } from "express";
import {
    changePassword,
    deleteUserAccount,
    getAllUsers,
    getUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
} from "../controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/:ID").get(verifyJWT, getUser);

router.route("/").get(verifyJWT, getAllUsers);
router.route("/change_password").post(verifyJWT, changePassword);
router.route("/delete").post(verifyJWT, deleteUserAccount);

export default router;
