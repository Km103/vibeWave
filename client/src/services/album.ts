import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

const getAlbum = async (id: string) => {
    const response = await axios.get(`${URL}/Album/${id}`);
    return response.data.data;
};

export { getAlbum };
