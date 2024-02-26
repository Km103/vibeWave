import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        singer: {
            type: String,
            required: true,
        },
        track: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
        },
        language: {
            type: String,
        },
        image: {
            type: String,
        },
        album: {
            type: Schema.Types.ObjectId,
            ref: "Album",
        },
    },
    {
        timestamps: true,
    }
);

export const Song = mongoose.model("Song", songSchema);
