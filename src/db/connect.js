import { db_name } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
        console.log("DB connected ...");
    } catch (error) {
        console.log("failed connecting to DB...", error);
        process.exit(1);
    }
};

export default connectDB;
