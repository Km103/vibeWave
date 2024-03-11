"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAlbum } from "@/services/album";
import Image from "next/image";
import SongSearchCard from "@/components/SongSearchCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerDispatch } from "@/redux/store";
import { setActiveSong } from "@/redux/features/PlayersSlice";

interface Album {
    name: string;
    songs: [{}];
    image: string;
}
function Page({ params }: { params: { id: string } }) {
    const [Album, setAlbum] = useState<Album>({} as Album);
    const dispatch = usePlayerDispatch();
    useEffect(() => {
        getAlbum(params.id).then((data) => {
            console.log(data[0]);
            setAlbum(data[0]);
        });
    }, [params.id]);

    return (
        <div className="text-xl ml-[14%] px-16 py-8 ">
            {Album ? (
                <div className="mt-24">
                    <div className="flex flex-row  items-center justify-start">
                        <Image
                            src={Album.image}
                            alt="Album"
                            width="250"
                            height="250"
                            className="rounded-full"
                        />
                        <div className="text-5xl px-12 font-bold basis-3/4 ">
                            {Album.name}
                        </div>
                    </div>

                    <h1 className="text-2xl  font-semibold pt-16 pb-4">
                        Songs
                    </h1>

                    <ScrollArea className="h-screen mt-4 py-4 border-r-4  rounded-md  mb-20 px-8 mr-16  flex flex-col">
                        {Album.songs?.map((song: any) => (
                            <div key={song.id}>
                                {song.image && (
                                    <SongSearchCard
                                        name={song.name}
                                        image={song.image}
                                        onClick={() => {
                                            dispatch(
                                                setActiveSong({
                                                    song: song,
                                                    data: Album.songs,
                                                    i: Album.songs.findIndex(
                                                        (s: any) =>
                                                            s.id === song.id
                                                    ),
                                                })
                                            );
                                        }}
                                        singer={Album.name}
                                    />
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            ) : (
                <div className="ml-[14%] text-3xl text-center">Loading...</div>
            )}
        </div>
    );
}

export default Page;
