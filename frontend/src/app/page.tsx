"use client";
import { useEffect, useState } from "react";
import { getHomeData } from "@/services/home";
import ArtistCard from "@/components/ArtistCard";
import { useRouter } from "next/navigation";

interface HomeData {
    topArtists: Array<any>;
    topAlbums: Array<any>;
    topSongs: Array<any>;
}
export default function Home() {
    const [homeData, setHomeData] = useState<HomeData>({} as HomeData);
    const [loading, setLoading] = useState(true);
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
        <div className="ml-[14%] flex flex-col  px-4 py-4">
            <div className="text-2xl font-semibold py-4">Home</div>
            {homeData?.topArtists && (
                <div>
                    <div className="text-xl font-semibold py-4 px-4">
                        Top Artists
                    </div>
                    <div>
                        {homeData.topArtists.map((artist: any) => (
                            <div
                                key={artist._id}
                                className="flex flex-row px-4 py-2"
                            >
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
        </div>
    );
}
