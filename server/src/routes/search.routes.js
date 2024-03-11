import { Router } from "express";
import {
    searchSong,
    searchAlbum,
    searchArtist,
    searchAll,
} from "../controllers/search.controllers.js";

const router = Router();

router.route("/song").get(searchSong);
router.route("/artist").get(searchArtist);
router.route("/album").get(searchAlbum);
router.route("/").get(searchAll);
export default router;
