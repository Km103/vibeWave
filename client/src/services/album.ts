import axios from "axios";

const getAlbum = async (id: string) => {
    const response = await axios.get(`/api/Album/${id}`);
    return response.data.data;
};

export { getAlbum };
