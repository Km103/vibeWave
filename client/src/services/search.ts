import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL;

const searchSongs = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `${URL}/search/song?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchArtists = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `${URL}/search/artist?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchAlbums = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `${URL}/search/album?q=${query}&page=${page}`
    );
    return response.data.data;
};

const searchAllData = async (query: string, page: Number = 1) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(`${URL}/search?q=${query}&page=${page}`);
    return response.data.data;
};

export { searchSongs, searchArtists, searchAlbums, searchAllData };
