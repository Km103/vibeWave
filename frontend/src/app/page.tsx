"use client";
import { useEffect, useState } from "react";
import { getHomeData } from "@/services/home";
import ArtistCard from "@/components/ArtistCard";
import { useRouter } from "next/navigation";
import AlbumCard from "@/components/AlbumCard";
import { usePlayerDispatch } from "@/redux/store";
import { setActiveSong } from "@/redux/features/PlayersSlice";
interface HomeData {
    topArtists: Array<any>;
    topAlbums: Array<any>;
    topSongs: Array<any>;
}

export default function Home() {
    const [homeData, setHomeData] = useState<HomeData>({} as HomeData);
    const [loading, setLoading] = useState(true);
    const dispatch = usePlayerDispatch();
    const router = useRouter();
    useEffect(() => {
        getHomeData().then((data) => {
            console.log(data);
            setHomeData(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="ml-[14%] flex flex-col mb-20 px-8 mt-8 py-4">
            {homeData?.topArtists && (
                <div>
                    <div className="text-3xl font-semibold py-4 ">
                        Top Artists
                    </div>
                    <div className="flex flex-wrap gap-y-8 gap-x-8 items-center h-[25%] ">
                        {homeData.topArtists.map((artist: any) => (
                            <div key={artist._id}>
                                <ArtistCard
                                    name={artist.name}
                                    image={artist.image}
                                    onClick={() => {
                                        router.push(`/artist/${artist._id}`);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {homeData?.topAlbums && (
                <div>
                    <div className="text-3xl font-semibold py-8 mt-8 ">
                        Top Albums
                    </div>
                    <div className="flex flex-wrap gap-y-8 gap-x-8 items-center h-[25%] ">
                        {homeData.topAlbums.map((album: any) => (
                            <div key={album._id}>
                                <AlbumCard
                                    name={album.name}
                                    image={album.image}
                                    onClick={() => {
                                        router.push(`/album/${album._id}`);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {homeData?.topSongs && (
                <div>
                    <div className="text-3xl font-semibold py-8 mt-8 ">
                        Top Songs
                    </div>
                    <div className="flex flex-wrap gap-y-8 gap-x-8 items-center h-[25%] ">
                        {homeData.topSongs.map((song: any) => (
                            <div key={song._id}>
                                <AlbumCard
                                    name={song.name}
                                    image={song.image}
                                    onClick={() => {
                                        dispatch(
                                            setActiveSong({
                                                song: song,
                                                data: homeData.topSongs,
                                                i: homeData.topSongs.findIndex(
                                                    (s: any) => s.id === song.id
                                                ),
                                            })
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
