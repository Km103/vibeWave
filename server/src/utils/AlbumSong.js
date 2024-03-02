export const AlbumSongsQuery = async (id) => {
    try {
        const response = await fetch(
            `${process.env.DATA_URL}/albums/?id=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json(); // Parse the JSON response

        return data.data.songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
};
