import { Router } from "express";
import { searchSong } from "../controllers/search.controllers.js";

const router = Router();

router.route("/song").post(searchSong);
export default router;
