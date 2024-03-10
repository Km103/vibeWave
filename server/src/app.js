import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        orgin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import songRoutes from "./routes/song.routes.js";
import userRoutes from "./routes/user.routes.js";
import searchRoutes from "./routes/search.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import artistRoutes from "./routes/artist.routes.js";
import albumRoutes from "./routes/album.routes.js";
import homeRoutes from "./routes/home.routes.js";

app.use("/api/v1/song", songRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/artist", artistRoutes);
app.use("/api/v1/album", albumRoutes);
app.use("/api/v1/home", homeRoutes);
export { app };
