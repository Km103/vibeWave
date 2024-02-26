import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import {
    deleteAllSongs,
    getAllSongs,
    getSong,
    updateAllSongs,
    uploadSong,
} from "../controllers/song.controller.js";

router.route("/upload").post(upload.single("file"), uploadSong);
router.route("/:ID").get(getSong);
router.route("/").get(getAllSongs);
router.route("/updateAll").post(updateAllSongs);
router.route("/deleteAll").post(deleteAllSongs);
export default router;
