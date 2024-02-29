import { Playlist } from "../models/playlist.models.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createPlaylists = asyncWrapper(async (req, res) => {
    const { name } = req.body;
    const id = req.user._id;
    const playlist = await Playlist.create({
        name,
        owner: id,
    });

    if (!playlist) {
        throw new ApiError(
            500,
            "Something went wrong while creating the playlist"
        );
    }
    res.status(200).json(
        new ApiResponse(201, {}, "Playlist created Successfully")
    );
});

const getPlaylists = asyncWrapper(async (req, res) => {
    const playlists = await Playlist.find({ owner: req.user._id });

    res.status(200).json(
        new ApiResponse(200, playlists, "Playlists fetched Successfully")
    );
});

const deletePlaylist = asyncWrapper(async (req, res) => {
    const { playlistId } = req.body;
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    await Playlist.deleteOne({ _id: playlistId });

    res.status(200).json(
        new ApiResponse(200, {}, "Playlist deleted Successfully")
    );
});

const changeName = asyncWrapper(async (req, res) => {
    const { playlistId, name } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }
    playlist.name = name;
    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, playlist, "Playlist name changed Successfully")
    );
});

const addSong = asyncWrapper(async (req, res) => {
    const { songId, playlistId } = req.body;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    const songExists = playlist.songs.find(
        (song) => song.toString() === songId
    );

    if (songExists) {
        throw new ApiError(400, "Song already exists in the playlist");
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, {}, "Song added to playlist Successfully")
    );
});

const removeSong = asyncWrapper(async (req, res) => {
    const { songId, playlistId } = req.body;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    const songExists = playlist.songs.find(
        (song) => song.toString() === songId
    );

    if (!songExists) {
        throw new ApiError(400, "Song does not exist in the playlist");
    }

    playlist.songs = playlist.songs.filter(
        (song) => song.toString() !== songId
    );

    await playlist.save();

    res.status(200).json(
        new ApiResponse(200, {}, "Song removed from playlist Successfully")
    );
});

const getSongs = asyncWrapper(async (req, res) => {
    const playlist = await Playlist.findById(req.body.playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    const songs = await Playlist.aggregate([
        {
            $match: {
                _id: playlist._id,
            },
        },
        {
            $lookup: {
                from: "songs",
                localField: "songs",
                foreignField: "_id",
                as: "songs",
            },
        },
    ]);

    res.status(200).json(
        new ApiResponse(200, songs[0].songs, "Songs fetched Successfully")
    );
});

export {
    createPlaylists,
    getPlaylists,
    deletePlaylist,
    changeName,
    addSong,
    removeSong,
    getSongs,
};
