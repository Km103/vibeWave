import axios from "axios";

const searchSong = async (search, page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/search/song?q=${search}&page=${page}&limit=${limit}`
        );
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

export { searchSong };
