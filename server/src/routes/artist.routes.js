import { Router } from "express";
import {
    deleteAllArtists,
    deleteAllArtistsSongs,
    updateAllArtistSongs,
    updateAllArtists,
    updateAllArtistsFollowers,
    getArtist,
} from "../controllers/artist.controllers.js";

const router = Router();

// router.route("/updateAll").post(updateAllArtists);
// router.route("/deleteAll").post(deleteAllArtists);
// router.route("/updateAllSongs").post(updateAllArtistSongs);
// router.route("/deleteAllSongs").post(deleteAllArtistsSongs);
//router.route("/updateAllFollowers").post(updateAllArtistsFollowers);

router.route("/").get(getArtist);
export default router;
