import axios from "axios";

const getArtist = async (id: string) => {
    const response = await axios.get(`/api/artist/${id}`);
    return response.data.data;
};

export { getArtist };
