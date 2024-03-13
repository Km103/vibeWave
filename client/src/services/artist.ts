import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL;

const getArtist = async (id: string) => {
    const response = await axios.get(`${URL}/artist/${id}`);
    return response.data.data;
};

export { getArtist };
