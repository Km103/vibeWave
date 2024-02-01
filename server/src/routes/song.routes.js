import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import {
    getAllSongs,
    getSong,
    uploadSong,
} from "../controllers/song.controller.js";

router.route("/upload").post(upload.single("file"), uploadSong);
router.route("/:ID").get(getSong);
router.route("/").get(getAllSongs);
export default router;
