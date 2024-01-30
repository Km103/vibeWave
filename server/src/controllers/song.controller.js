import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncWrapper from "../utils/asyncWrapper.js";

import ApiResonse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Song } from "../models/song.models.js";

const uploadSong = asyncWrapper(async (req, res) => {
    const { name, singer, album } = req.body;

    if (!name) {
        throw new ApiError(400, "name Of Song is  required");
    }

    if (!singer) {
        throw new ApiError(400, "name Of Singer is  required");
    }

    const findSong = await Song.findOne({ name: name });

    if (findSong) {
        throw new ApiError(400, "Song with same Name Already Exists");
    }

    const localSongPath = req.file?.path;
    //console.log(localSongPath);

    if (!localSongPath) {
        throw new ApiError(400, "Song Track Is required");
    }

    const song = await uploadOnCloudinary(localSongPath);

    if (!song) {
        throw new ApiError(400, "Song upload failed ");
    }

    const UploadedSong = await Song.create({
        name,
        singer,
        track: song.url,
        album,
    });
    res.status(201).json(
        new ApiResonse(200, UploadedSong, "Song Uploaded Successfully")
    );
});

const getSong = asyncWrapper(async (req, res) => {
    const song = await Song.findById(req.params.ID);
    if (!song) {
        throw new ApiError(404, "Song does not exist");
    }
    res.status(200).json(new ApiResonse(200, song));
});

export { uploadSong, getSong };
