"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArtist } from "@/services/artist";
import Image from "next/image";
import SongSearchCard from "@/components/SongSearchCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerDispatch } from "@/redux/store";
import { setActiveSong } from "@/redux/features/PlayersSlice";

interface Artist {
    name: string;
    songs: [{}];
    image: string;
}
function Page({ params }: { params: { id: string } }) {
    const [artist, setArtist] = useState<Artist>({} as Artist);
    const dispatch = usePlayerDispatch();
    useEffect(() => {
        getArtist(params.id).then((data) => {
            console.log(data[0]);
            setArtist(data[0]);
        });
    }, [params.id]);

    return (
        <div className="text-xl ml-[14%] px-16 py-8 ">
            {artist ? (
                <div className="mt-24">
                    <div className="flex flex-row  items-center justify-start">
                        <Image
                            src={artist.image}
                            alt="artist"
                            width="250"
                            height="250"
                            className="rounded-full"
                        />
                        <div className="text-5xl px-12 font-bold basis-3/4 ">
                            {artist.name}
                        </div>
                    </div>

                    <h1 className="text-2xl px-8 font-semibold pt-24 ">
                        Songs
                    </h1>

                    <ScrollArea className="h-[680px] mt-4 py-4 border-r-4  rounded-md  mb-20 px-8 mr-16  flex flex-col">
                        {artist.songs?.map((song: any) => (
                            <div key={song.id}>
                                {song.image && (
                                    <SongSearchCard
                                        name={song.name}
                                        image={song.image}
                                        onClick={() => {
                                            dispatch(
                                                setActiveSong({
                                                    song: song,
                                                    data: artist.songs,
                                                    i: artist.songs.findIndex(
                                                        (s: any) =>
                                                            s.id === song.id
                                                    ),
                                                })
                                            );
                                        }}
                                        singer={artist.name}
                                    />
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            ) : (
                <div className="ml-[14%] text-3xl">Loading...</div>
            )}
        </div>
    );
}

export default Page;
