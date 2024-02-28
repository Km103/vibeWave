import asyncWrapper from "../utils/asyncWrapper.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Song } from "../models/song.models.js";
import paginate from "mongoose-paginate-v2";

const searchSong = asyncWrapper(async (req, res) => {
    const name = req.query.q;
    const page = req.query.page;
    const limit = req.query.limit;
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const options = {
        sort: { playCount: -1 },
        page: page || 1,
        limit: limit || 10,
    };

    const songs = await Song.paginate(
        { name: { $regex: name, $options: "i" } },
        options
    );
    res.status(200).json(
        new ApiResponse(200, songs, "Songs Searched Successfully")
    );
});

export { searchSong };
