export const AlbumQuery = async (query, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${process.env.DATA_URL}/search/albums?query=${query}&page=${page}&limit=${limit}`,
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

export const AllAlbumQueryPages = async (query) => {
    const myAlbums = [];
    for (let i = 1; i < 5; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        AlbumQuery(query, i, 20)
            .then((AlbumData) => {
                AlbumData?.data?.results.forEach((album) => {
                    if (!myAlbums.find((x) => x.id === album.id)) {
                        myAlbums.push(album);
                    }
                });
            })
            .catch((error) => {
                console.error("Error processing albums information:", error);
            });
    }
    return myAlbums;
};

export const collectAllAlbums = async () => {
    const AllAlbums = [];
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        try {
            const albums = await AllAlbumQueryPages(char);

            AllAlbums.push(...albums);
            console.log(`Fetched albums for "${char}":`, albums.length);
        } catch (error) {
            console.error(`Error fetching albums for "${char}":`, error);
        }
    }

    return AllAlbums;
};
