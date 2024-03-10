import { Router } from "express";
const router = Router();

import { getHomeData } from "../controllers/home.controllers.js";

router.route("/").get(getHomeData);

export default router;
