import React, { useEffect } from "react";
import { searchSong } from "@/services/SearchService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Play from "./Play";
function Search() {
    const [songs, setSongs] = useState([]);
    const { id } = useParams();
    const [currentSong, setCurrentSong] = useState({});
    useEffect(() => {
        console.log(id);
        searchSong(id)
            .then((data) => {
                setSongs(data.docs);
            })
            .finally(() => {
                console.log(songs);
            });
    }, [id]);

    return (
        <div
            className="min-h-screen h-full text-white  text-xl flex flex-col 
                bg-[#000000f8]  "
        >
            <div className="text-2xl text-center">Search Results </div>
            {songs.map(function (song) {
                return (
                    <li
                        className="text-white flex flex-col text-xl  py-4 px-12
                        cursor-pointer  border-b-2 border-gray-600 
                    "
                        key={song._id}
                        onClick={() => {
                            setCurrentSong(song);
                        }}
                    >
                        <div className="flex flex-row items-center text-xl font-medium px-24">
                            <img
                                src={song.image}
                                alt="song"
                                className="w-16 h-16 "
                            />
                            <div className="m-8">{song.name}</div>
                            <div className="align"> {song.singer}</div>
                        </div>
                    </li>
                );
            })}
            <Play
                songs={songs}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />
        </div>
    );
}

export default Search;
