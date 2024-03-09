import axios from "axios";

const searchSongs = async (query: string, page: Number) => {
    query = query.replace(/%20/g, "+");
    const response = await axios.get(
        `/api/search/song?q=${query}&page=${page}`
    );
    return response.data.data;
};
export default searchSongs;
