import { Router } from "express";

const router = Router();
import {
    deleteAllAlbums,
    getTopAlbums,
    updateAllAlbums,
    updateAllAlbumSongs,
    getAlbum,
} from "../controllers/album.controllers.js";

router.route("/updateAll").post(updateAllAlbums);
router.route("/deleteAll").post(deleteAllAlbums);
router.route("/top").get(getTopAlbums);
router.route("/updateAllSongs").post(updateAllAlbumSongs);
router.route("/").get(getAlbum);
///router.route("/deleteAllSongs").post(deleteAllAlbumsSongs);

export default router;
