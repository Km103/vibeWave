import React from "react";
import ArtistCard from "../ArtistCard";
import { useRouter } from "next/navigation";

function Artists({ artists }: { artists: any }) {
    const router = useRouter();
    return (
        <div>
            <div className="text-2xl font-semibold py-4 px-6 ">Artists</div>
            <div className="flex flex-wrap  gap-x-8 items-center px-16">
                {artists.map((artist: any) => (
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
    );
}

export default Artists;
