import asyncWrapper from "../utils/asyncWrapper.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Song } from "../models/song.models.js";
import paginate from "mongoose-paginate-v2";
import { Artist } from "../models/artist.models.js";
import { Album } from "../models/album.models.js";

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

const searchArtist = asyncWrapper(async (req, res) => {
    const name = req.query.q;
    const page = req.query.page;
    const limit = req.query.limit;
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const options = {
        sort: {
            followerCount: -1,
        },
        page: page || 1,
        limit: limit || 10,
        select: "name image followerCount",
    };

    const songs = await Artist.paginate(
        { name: { $regex: name, $options: "i" } },
        options
    );
    res.status(200).json(
        new ApiResponse(200, songs, "Songs Searched Successfully")
    );
});

const searchAlbum = asyncWrapper(async (req, res) => {
    const name = req.query.q;
    const page = req.query.page;
    const limit = req.query.limit;
    if (!name) {
        throw new ApiError(400, "Name is required");
    }

    const options = {
        sort: {
            songCount: -1,
        },
        page: page || 1,
        limit: limit || 10,
        select: "name image songCount",
    };

    const songs = await Album.paginate(
        { name: { $regex: name, $options: "i" } },
        options
    );
    res.status(200).json(
        new ApiResponse(200, songs, "Songs Searched Successfully")
    );
});

const searchAll = asyncWrapper(async (req, res) => {
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
    const options2 = {
        sort: {
            followerCount: -1,
        },
        page: page || 1,
        limit: limit || 3,
        select: "name image followerCount",
    };

    const options3 = {
        sort: {
            songCount: -1,
        },
        page: page || 1,
        limit: limit || 3,
        select: "name image songCount",
    };

    const songs = await Song.paginate(
        { name: { $regex: name, $options: "i" } },
        options
    );
    const artists = await Artist.paginate(
        { name: { $regex: name, $options: "i" } },
        options2
    );
    const albums = await Album.paginate(
        { name: { $regex: name, $options: "i" } },
        options3
    );
    res.status(200).json(
        new ApiResponse(
            200,
            { songs, artists, albums },
            "Songs Searched Successfully"
        )
    );
});
export { searchSong, searchArtist, searchAlbum, searchAll };
