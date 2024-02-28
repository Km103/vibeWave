export const SongQuery = async (query, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${process.env.SONGS_URL}/search/songs?query=${query}&page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json(); // Parse the JSON response

        return data;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
};

export const AllSongQueryPages = async (query) => {
    const mysongs = [];
    for (let i = 1; i < 600; i++) {
        if (i % 40 === 0)
            await new Promise((resolve) => setTimeout(resolve, 500));
        SongQuery(query, i, 20)
            .then((songsData) => {
                songsData?.data?.results.forEach((song) => {
                    if (!mysongs.find((x) => x.id === song.id)) {
                        mysongs.push(song);
                    }
                });
            })
            .catch((error) => {
                console.error("Error processing songs:", error);
            });
    }
    return mysongs;
};

export const collectAllSongs = async () => {
    const AllSongs = [];
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        try {
            // Call the function to fetch songs for the current character
            const songs = await AllSongQueryPages(char);

            // Append fetched songs to the allSongs array
            AllSongs.push(...songs);
            console.log(`Fetched songs for "${char}":`, songs.length); // Log fetched count
        } catch (error) {
            console.error(`Error fetching songs for "${char}":`, error);
        }
    }

    return AllSongs;
};
