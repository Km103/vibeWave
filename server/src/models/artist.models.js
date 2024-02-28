import mongoose, { Schema } from "mongoose";

const artistSchema = new Schema(
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
        fanCount: {
            type: Number,
            default: 0,
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

export const Artist = mongoose.model("Artist", artistSchema);
