import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createPlaylists,
    getPlaylists,
    deletePlaylist,
    changeName,
    addSong,
    removeSong,
    getSongs,
} from "../controllers/playlist.controllers.js";

const router = Router();

router.route("/").get(verifyJWT, getPlaylists);
router.route("/create").post(verifyJWT, createPlaylists);
router.route("/delete").post(verifyJWT, deletePlaylist);
router.route("/change-name").post(verifyJWT, changeName);
router.route("/add-song").post(verifyJWT, addSong);
router.route("/remove-song").post(verifyJWT, removeSong);
router.route("/songs").post(verifyJWT, getSongs);

export default router;
