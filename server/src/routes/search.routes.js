import { Router } from "express";
import { searchSong } from "../controllers/search.controllers.js";

const router = Router();

router.route("/song").get(searchSong);
export default router;
