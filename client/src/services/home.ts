import axios from "axios";

const getHomeData = async () => {
    const response = await axios.get("/api/home");
    return response.data.data;
};

export { getHomeData };
