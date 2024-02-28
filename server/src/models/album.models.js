import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
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
        language: {
            type: String,
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

export const Album = mongoose.model("Album", albumSchema);
