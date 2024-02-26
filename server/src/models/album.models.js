import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        image: {
            type: String,
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
        language: {
            type: String,
        },
        artist: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Album = mongoose.model("Album", albumSchema);
