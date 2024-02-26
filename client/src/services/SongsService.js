import axios from "axios";

const getAllSongs = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/song?page=${page}&limit=${limit}`
        );
        console.log(response);
        return response.data.data.docs;
    } catch (err) {
        console.log(err);
    }
};

const getSongById = async (id) => {
    try {
        const response = await axios.get(
            `http://localhost:8000/api/v1/song/${id}`
        );
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllSongs, getSongById };
