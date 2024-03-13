import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL;

const getHomeData = async () => {
    console.log(URL);
    const response = await axios.get(`${URL}/home`);
    return response.data.data;
};

export { getHomeData };
