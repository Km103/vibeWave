import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncWrapper from "../utils/asyncWrapper.js";

import ApiResonse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Song } from "../models/song.models.js";
import paginate from "mongoose-paginate-v2";
import { collectAllSongs } from "../utils/SongQuery.js";

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

const getAllSongs = asyncWrapper(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const options = {
        page: page,
        limit: limit,
    };

    const songs = await Song.paginate({}, options);

    if (!songs) {
        throw new ApiError(404, "Song list is empty");
    }
    res.status(200).json(
        new ApiResonse(200, songs, "songs fetched successfully")
    );
});

const uploadSongToDb = async (song) => {
    try {
        const { name, primaryArtists } = song;

        await Song.create({
            id: song.id,
            name: name,
            singer: primaryArtists,
            track: song.downloadUrl[4].link,
            duration: song.duration,
            language: song.language,
            image: song.image[2].link,
            playCount: song.playCount,
        });
    } catch (error) {
        console.log("outer loop failed", error);
    }
};

const updateAllSongs = asyncWrapper(async (req, res) => {
    const AllSongs = await collectAllSongs();

    if (!AllSongs) {
        throw new ApiError(404, "Song list is empty");
    }
    console.log(AllSongs.length);

    let cnt = 0;

    AllSongs?.forEach(async (song) => {
        await uploadSongToDb(song);
        cnt = cnt + 1;
        if (cnt === 100)
            await new Promise((resolve) => setTimeout(resolve, 500));
    });

    res.status(200).json(
        new ApiResonse(200, {}, "songs updated to DB successfully")
    );
});

const deleteAllSongs = asyncWrapper(async (req, res) => {
    const deletedSongs = await Song.deleteMany();
    if (!deletedSongs) {
        throw new ApiError(404, "Song list is empty");
    }
    res.status(200).json(
        new ApiResonse(200, {}, "songs deleted from DB successfully")
    );
});

const getSongByQuery = asyncWrapper(async (req, res) => {
    const id = req.query.id;
    const song = await Song.findOne({ id: id });
    if (!song) {
        throw new ApiError(404, "Song does not exist");
    }
    res.status(200).json(
        new ApiResonse(200, song, "Song Fetched Successfully")
    );
});

export {
    uploadSong,
    getAllSongs,
    updateAllSongs,
    deleteAllSongs,
    getSongByQuery,
    uploadSongToDb,
};
