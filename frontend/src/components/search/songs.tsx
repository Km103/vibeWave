import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import SongSearchCard from "../SongSearchCard";
import { usePlayerDispatch } from "../../redux/store";
import { setActiveSong } from "../../redux/features/PlayersSlice";

function Songs({ songs }: { songs: any }) {
    const dispatch = usePlayerDispatch();
    return (
        <div className=" px-6 py-4 ">
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
        </div>
    );
}

export default Songs;
