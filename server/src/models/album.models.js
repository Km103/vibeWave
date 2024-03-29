import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
        songCount: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);
albumSchema.plugin(mongoosePaginate);
export const Album = mongoose.model("Album", albumSchema);
