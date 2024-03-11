"use client";
import React, { use, useEffect, useState } from "react";
import { searchSongs } from "@/services/search";
import { usePlayerSelector, usePlayerDispatch } from "@/redux/store";
import { setActiveSong } from "@/redux/features/PlayersSlice";
import SongSearchCard from "@/components/SongSearchCard";
import { DiJava, DiVisualstudio } from "react-icons/di";
import { ScrollArea } from "@/components/ui/scroll-area";

function Page({ params }: { params: { slug: string } }) {
    const [songs, setSongs] = useState<[] | null>([]);
    const dispatch = usePlayerDispatch();
    useEffect(() => {
        searchSongs(params.slug, 1).then((data) => {
            setSongs(data.docs);
        });
    }, [params.slug]);

    if (songs) {
        console.log(songs);
        return (
            <div className="ml-[14%] px-6 py-4 mb-20">
                <div className="text-2xl font-semibold py-4 mt-24 ">Songs</div>
                <ScrollArea className=" b-2 px-16 h-80 mr-20">
                    {songs.map((song: any) => (
                        <div key={song._id}>
                            <SongSearchCard
                                name={song.name}
                                singer={song.singer}
                                image={song.image}
                                onClick={() => {
                                    dispatch(
                                        setActiveSong({
                                            song: song,
                                            data: songs,
                                            i: songs.findIndex(
                                                (s: any) => s._id === song._id
                                            ),
                                        })
                                    );
                                }}
                            />
                        </div>
                    ))}
                </ScrollArea>
                <div className="flex flex-col  text-center ml-[14%] text-xl py-4 px-8 "></div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
}

export default Page;
