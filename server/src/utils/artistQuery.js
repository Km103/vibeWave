export const ArtistQuery = async (query, page = 1, limit = 10) => {
    try {
        const response = await fetch(
            `${process.env.DATA_URL}/search/artists?query=${query}&page=${page}&limit=${limit}`,
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

export const AllArtistQueryPages = async (query) => {
    const myArtists = [];
    for (let i = 1; i < 1000; i++) {
        if (i % 100 === 0)
            await new Promise((resolve) => setTimeout(resolve, 500));
        ArtistQuery(query, i, 20)
            .then((ArtistsData) => {
                ArtistsData?.data?.results.forEach((artist) => {
                    if (!myArtists.find((x) => x.id === artist.id)) {
                        myArtists.push(artist);
                    }
                });
            })
            .catch((error) => {
                console.error("Error processing artists information:", error);
            });
    }
    return myArtists;
};

export const collectAllArtists = async () => {
    const AllArtists = [];
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        try {
            const artists = await AllArtistQueryPages(char);

            AllArtists.push(...artists);
            console.log(`Fetched artists for "${char}":`, artists.length);
        } catch (error) {
            console.error(`Error fetching artists for "${char}":`, error);
        }
    }

    return AllArtists;
};
