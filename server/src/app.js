import express from "express";
import cors from "cors";
const app = express();

app.use(
    cors({
        orgin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import songRoutes from "./routes/song.routes.js";
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/song", songRoutes);
app.use("/api/v1/user", userRoutes);

export { app };
