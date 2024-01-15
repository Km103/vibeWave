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
        Tags: [
            {
                type: String,
            },
        ],
        album: {
            type: String,
        },

        albumPhoto: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Song = mongoose.model("Song", songSchema);
