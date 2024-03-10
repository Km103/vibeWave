import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const artistSchema = new Schema(
    {
        id: {
            type: String,
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
        followerCount: {
            type: Number,
            default: 0,
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Song",
                unique: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);
artistSchema.plugin(mongoosePaginate);
export const Artist = mongoose.model("Artist", artistSchema);
