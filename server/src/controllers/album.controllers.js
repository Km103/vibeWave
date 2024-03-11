import { Album } from "../models/album.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Song } from "../models/song.models.js";

import { collectAllAlbums } from "../utils/albumQuery.js";
import { AlbumSongsQuery } from "../utils/AlbumSong.js";
import { uploadSongToDb } from "./song.controller.js";
import mongoose from "mongoose";
const createAlbum = asyncWrapper(async (req, res) => {
    const { name, image, language } = req.body;

    const album = await Album.create({ name, image, language });
    res.status(201).json(
        new ApiResponse(201, album, "Album Created Successfully")
    );
});

const deleteAllAlbums = asyncWrapper(async (req, res) => {
    await Album.deleteMany({});
    res.status(200).json(new ApiResponse(200, {}, "All Albums Deleted"));
});

const uploadAlbumToDb = async (album) => {
    try {
        const { id, name, songCount, language } = album;
        const songs = album.songs.map((song) => song.id);
        await Album.create({
            id,
            name,
            image: album.image[2].link,
            language,
            songs,
            songCount,
        });
    } catch (error) {
        console.log("error while updating albums", error);
    }
};

const updateAllAlbums = asyncWrapper(async (req, res) => {
    const AllAlbums = await collectAllAlbums();

    console.log("all albums", AllAlbums.length);
    let cnt = 0;
    for (const album of AllAlbums) {
        await uploadAlbumToDb(album);
        cnt = cnt + 1;
        if (cnt === 100)
            await new Promise((resolve) => setTimeout(resolve, 500));
    }

    res.status(201).json(
        new ApiResponse(200, {}, "Albums Uploaded Successfully")
    );
});

const getTopAlbums = asyncWrapper(async (req, res) => {
    const topAlbums = await Album.find({})
        .sort({ songCount: -1 })
        .limit(20)
        .select("-songs");
    res.status(200).json(new ApiResponse(200, topAlbums, "Top Albums"));
});

const uploadAlbumSongs = async (album) => {
    const { id } = album;
    const songs = await AlbumSongsQuery(id);
    for (const song of songs) {
        const songExist = await Song.findOne({ id: song.id });
        if (!songExist) {
            await uploadSongToDb(song);
        }
        const uploadedSong = await Song.findOne({ id: song.id });
        album.songs.push(uploadedSong._id);
    }
    await album.save();
};

const updateAllAlbumSongs = asyncWrapper(async (req, res) => {
    const albums = await Album.find().sort({ songCount: -1 }).limit(20);
    let cnt = 1;

    for (const album of albums) {
        await uploadAlbumSongs(album);
        if (cnt % 10 === 0)
            await new Promise((resolve) => setTimeout(resolve, 500));
        cnt++;
    }

    res.status(200).json(
        new ApiResponse(200, {}, "Artist Songs Updated Successfully")
    );
});

const getAlbum = asyncWrapper(async (req, res) => {
    const id = req.params.ID;

    const album = await Album.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "songs",
                localField: "songs",
                foreignField: "_id",
                pipeline: [
                    {
                        $sort: {
                            playCount: -1,
                        },
                    },
                ],

                as: "songs",
            },
        },
    ]);
    if (!album) {
        throw new ApiError(404, "Album not found");
    }
    res.status(200).json(new ApiResponse(200, album, "Album found"));
});

export {
    createAlbum,
    getAlbum,
    deleteAllAlbums,
    updateAllAlbums,
    getTopAlbums,
    updateAllAlbumSongs,
};
