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

export const collectAllArtistSongs = async (id) => {
    const songs = [];
    // console.log("started fetching songs for artist", id);
    for (let i = 1; i < 20; i++) {
        if (i % 10 === 0)
            await new Promise((resolve) => setTimeout(resolve, 1000));

        const songsData = await ArtistSongsQuery(id, i);
        songsData?.data?.results.forEach((song) => {
            if (!songs.find((x) => x.id === song.id)) {
                songs.push(song);
            }
        });
    }
    return songs;
};
