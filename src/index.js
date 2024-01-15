import connectDB from "./db/connect.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const PORT = 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server started on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Connection failed ", err);
    });
