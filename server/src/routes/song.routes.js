import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import {
    deleteAllSongs,
    getAllSongs,
    updateAllSongs,
    uploadSong,
    getSongByQuery,
} from "../controllers/song.controller.js";

router.route("/upload").post(upload.single("file"), uploadSong);
router.route("/").get(getAllSongs);
router.route("/updateAll").post(updateAllSongs);
// router.route("/deleteAll").post(deleteAllSongs);
router.route("/").get(getSongByQuery);
export default router;
