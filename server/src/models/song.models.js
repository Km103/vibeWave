import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const songSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        singer: {
            type: String,
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
        playCount: {
            type: Number,
            default: 0,
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

songSchema.plugin(mongoosePaginate);
export const Song = mongoose.model("Song", songSchema);
