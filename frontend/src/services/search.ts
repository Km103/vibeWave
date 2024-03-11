import axios from "axios";

const searchSongs = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `/api/search/song?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchArtists = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `/api/search/artist?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchAlbums = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `/api/search/album?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchAllData = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(`/api/search?q=${query}&page=${page}`);
    return response.data.data;
};

export { searchSongs, searchArtists, searchAlbums };
