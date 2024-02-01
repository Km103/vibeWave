import axios from "axios";
import { useEffect, useState } from "react";
import PlayCard from "../components/PlayCard";
import { Link } from "react-router-dom";
import Player from "../components/Player";

function Play() {
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/v1/song")
            //  .then((response) => response.json())
            .then((response) => {
                setSongs(response.data.data);
                console.log(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="w-screen h-full min-h-screen bg-auto bg-gray-900">
            <div className="text-5xl text-center py-8 font-semibold text-white">
                List of all Songs
            </div>
            <div className="text-xl text-blue-600 flex justify-center items-center flex-col">
                {songs.map((song) => (
                    <Player track={song.track} name={song.name} />
                ))}
            </div>
        </div>
    );
}

export default Play;
