import { Router } from "express";

const router = Router();
import {
    deleteAllAlbums,
    getTopAlbums,
    updateAllAlbums,
    updateAllAlbumSongs,
    getAlbum,
    createAlbum,
} from "../controllers/album.controllers.js";

// router.route("/updateAll").post(updateAllAlbums);
// router.route("/deleteAll").post(deleteAllAlbums);
router.route("/top").get(getTopAlbums);
// router.route("/updateAllSongs").post(updateAllAlbumSongs);
router.route("/:ID").get(getAlbum);
///router.route("/deleteAllSongs").post(deleteAllAlbumsSongs);

router.route("/create").post(createAlbum);

export default router;
