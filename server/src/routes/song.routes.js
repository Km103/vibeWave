import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import { getSong, uploadSong } from "../controllers/song.controller.js";

router.route("/upload").post(upload.single("song"), uploadSong);
router.route("/:ID").get(getSong);
export default router;
