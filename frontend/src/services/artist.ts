const getArtist = async (id: string) => {
    const response = await fetch(`${API_URL}/artist?query=${id}`);
    return response.json();
};
