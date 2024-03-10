import asyncWrapper from "../utils/asyncWrapper.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Artist } from "../models/artist.models.js";
import { Song } from "../models/song.models.js";
import { Album } from "../models/album.models.js";

const topArtists = async () => {
    try {
        const artists = await Artist.find()
            .sort({ followerCount: -1 })
            .limit(10)
            .select("name image followerCount");
        return artists;
    } catch (error) {
        console.log(error);
    }
};

const topAlbums = async () => {
    try {
        const albums = await Album.find()
            .sort({ songCount: -1 })
            .limit(10)
            .select("name image songCount");
        return albums;
    } catch (error) {
        console.log(error);
    }
};

const popularSongs = async () => {
    try {
        const songs = await Song.find().sort({ playCount: -1 }).limit(10);
        return songs;
    } catch (error) {
        console.log(error);
    }
};

const getHomeData = asyncWrapper(async (req, res) => {
    const topArtistsData = await topArtists();
    const topAlbumsData = await topAlbums();
    const popularSongsData = await popularSongs();
    res.status(200).json(
        new ApiResponse(200, {
            topArtists: topArtistsData,
            topAlbums: topAlbumsData,
            popularSongs: popularSongsData,
        })
    );
});
export { getHomeData };
