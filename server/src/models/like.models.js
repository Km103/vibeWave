import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        songId: {
            type: Schema.Types.ObjectId,
            ref: "Song",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Like = mongoose.model("Like", likeSchema);
