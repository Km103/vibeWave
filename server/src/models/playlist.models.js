import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        song: [
            {
                type: Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
        photo: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
