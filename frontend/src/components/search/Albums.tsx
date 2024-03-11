import React from "react";
import AlbumCard from "../AlbumCard";
import { useRouter } from "next/navigation";

function Albums({ albums }: { albums: any }) {
    const router = useRouter();
    return (
        <div>
            <div className="text-2xl font-semibold  px-6 py-4 ">Albums</div>
            <div className="flex flex-wrap gap-y-8 gap-x-8 px-16 items-center h-[25%] ">
                {albums.map((album: any) => (
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
    );
}

export default Albums;
