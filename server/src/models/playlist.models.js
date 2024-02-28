import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            lowercase: true,
        },

        image: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Song",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
