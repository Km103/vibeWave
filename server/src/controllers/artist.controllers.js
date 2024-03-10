import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { Artist } from "../models/artist.models.js";
import { Song } from "../models/song.models.js";
import { collectAllArtists } from "../utils/artistQuery.js";
import { ArtistSongsQuery } from "../utils/ArtistSongsQuery.js";
import { uploadSongToDb } from "./song.controller.js";
import { collectAllArtistSongs } from "../utils/ArtistSongsQuery.js";
import mongoose from "mongoose";
import { getArtistFollowers } from "../utils/ArtistSongsQuery.js";
import { set } from "mongoose";

const createArtist = asyncWrapper(async (req, res) => {
    const { name, image } = req.body;

    const artist = await Artist.findOne({ name });
    if (artist) {
        throw new ApiError(400, "Artist already exists");
    }
    const createdArtist = await Artist.create({
        name,
        image,
    });

    res.status(201).json(
        new ApiResponse(201, createdArtist, "Artist created Successfully")
    );
});

const uploadArtistToDb = async (artist) => {
    try {
        const { id, name } = artist;

        await Artist.create({
            id: id,
            name: name,
            image: artist.image[2].link,
        });
    } catch (error) {
        console.log("outer loop failed", error);
    }
};

const updateAllArtists = asyncWrapper(async (req, res) => {
    const AllArtists = await collectAllArtists();

    console.log("all artists", AllArtists.length);
    if (!AllArtists) {
        throw new ApiError(404, "Artist list is empty");
    }
    let cnt = 0;
    AllArtists?.forEach(async (artist) => {
        await uploadArtistToDb(artist);
        cnt = cnt + 1;
        if (cnt === 100)
            await new Promise((resolve) => setTimeout(resolve, 500));
    });

    res.status(201).json(
        new ApiResponse(200, {}, "Artists Uploaded Successfully")
    );
});

const deleteAllArtists = asyncWrapper(async (req, res) => {
    await Artist.deleteMany({});

    res.status(200).json(
        new ApiResponse(200, {}, "Artists Deleted Successfully")
    );
});

const uploadArtistSongs = async (artist) => {
    try {
        const { id } = artist;
        const songs = await collectAllArtistSongs(id);
        for (const song of songs) {
            const searchedSong = await Song.findOne({ id: song.id });
            if (searchedSong) {
                artist.songs.push(searchedSong._id);
            }
            if (song.name && !searchedSong) {
                await uploadSongToDb(song);
                const uploadedSong = await Song.findOne({ id: song.id });
                artist.songs.push(uploadedSong._id);
            }
        }
        await artist.save();
        console.log("artist songs", artist.songs.length);
    } catch (error) {
        console.log(error);
    }
};

const updateAllArtistSongs = asyncWrapper(async (req, res) => {
    const artists = await Artist.find();
    // console.log(artists.length);
    artists.forEach(async (artist) => {
        await uploadArtistSongs(artist);
    });

    res.status(200).json(
        new ApiResponse(200, {}, "Artist Songs Updated Successfully")
    );
});

const deleteAllArtistsSongs = asyncWrapper(async (req, res) => {
    await Artist.updateMany({}, { $set: { songs: [] } });

    res.status(200).json(
        new ApiResponse(200, {}, "Artists Songs Deleted Successfully")
    );
});

const updateAllArtistsFollowers = asyncWrapper(async (req, res) => {
    const artists = await Artist.find({});
    for (const artist of artists) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Introduce 500ms delay
        const followers = await getArtistFollowers(artist.id);
        console.log("followers", followers);
        artist.followerCount = followers;
        await artist.save();
    }

    res.status(200).json(
        new ApiResponse(200, {}, "Artists Followers Updated Successfully")
    );
});

const getArtist = asyncWrapper(async (req, res) => {
    const id = req.params.ID;

    const artist = await Artist.aggregate([
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
        {
            $project: {
                id: 0,
            },
        },
    ]);
    if (!artist) {
        throw new ApiError(404, "Artist does not exist");
    }
    res.status(200).json(
        new ApiResponse(200, artist, "Artist Fetched Successfully")
    );
});

const getTopArtists = asyncWrapper(async (req, res) => {
    const topArtists = await Artist.find()
        .sort({ followerCount: -1 })
        .limit(10)
        .select("-songs");
    if (!topArtists) {
        throw new ApiError(404, "No Artists found");
    }
    res.status(200).json(
        new ApiResponse(200, topArtists, "Top Artists Fetched Successfully")
    );
});

export {
    createArtist,
    uploadArtistToDb,
    updateAllArtists,
    deleteAllArtists,
    updateAllArtistSongs,
    deleteAllArtistsSongs,
    updateAllArtistsFollowers,
    getArtist,
    getTopArtists,
};
