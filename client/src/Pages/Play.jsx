import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PlayCard from "../components/PlayCard";
import { Link } from "react-router-dom";
import { getAllSongs } from "@/services/SongsService";
import Player from "../components/Player/Player";
import { set } from "react-hook-form";

function Play() {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const audioElem = useRef(null);

    const progressRef = useRef(null);

    useEffect(() => {
        getAllSongs().then((data) => {
            setSongs(data);
            setCurrentSong(data[2]);
        });
        console.log(songs);
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioElem?.current.play();
        } else {
            audioElem?.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioElem.current.currentTime = 0;
        audioElem.current.play();
    }, [currentSong.name]);

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const currentTime = audioElem.current.currentTime;
        setCurrentSong({
            ...currentSong,
            progress: (currentTime / duration) * 100,
            length: duration,
            currentTime: currentTime,
        });
    };

    const handleProgressClick = (e) => {
        const offset = e.nativeEvent.offsetX;
        const width = progressRef.current.clientWidth;
        const percent = (offset / width) * 100;

        audioElem.current.currentTime = (percent * currentSong.length) / 100;
        setCurrentSong({ ...currentSong, progress: percent });
    };

    return (
        <div
            className="w-screen h-screen  bg-black flex flex-col 
            "
        >
            <div className="text-3xl py-4 font-medium  text-white text-center">
                Listen To top Songs
            </div>

            {songs.map(function (song) {
                return (
                    <li
                        className="text-white text-xl text-center py-4
                        hover:bg-gray-800 cursor-pointer  border-b-2 border-gray-600
                    "
                        key={song._id}
                        onClick={() => {
                            setCurrentSong(song);
                        }}
                    >
                        {song.name}
                    </li>
                );
            })}

            {currentSong && (
                <div
                    className="text-xl flex w-full border-gray-600 border-y-2
                     bg-[#212121] h-24 px-12 justify-evenly items-center  flex-row fixed bottom-0 mt-items-center"
                >
                    <audio
                        src={currentSong?.track}
                        ref={audioElem}
                        onTimeUpdate={onPlaying}
                    />

                    <div className="text-3xl text-center text-white">
                        {currentSong.name}
                    </div>

                    <div className="text-xl text-center text-white">
                        {Math.floor(currentSong.currentTime / 60)}:
                        {Math.floor(currentSong.currentTime % 60)}
                    </div>

                    {/* <Progress
                        value={currentSong.progress}
                        className="bg-white h-2 cursor-pointer dark:bg-black w-1/3"
                        onClick={handleProgressClick}
                        useRef={progressRef}
                    /> */}

                    <div
                        className="w-1/4 bg-white rounded-full h-1.5 mb-4 dark:bg-gray-700 cursor-pointer"
                        ref={progressRef}
                        onClick={handleProgressClick}
                    >
                        <div
                            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                            style={{ width: `${currentSong.progress + "%"}` }}
                        ></div>
                    </div>

                    <div className="text-xl text-center text-white">
                        {Math.floor(currentSong.length / 60)}:
                        {Math.floor(currentSong.length % 60)}
                    </div>
                    <Player
                        name={currentSong.name}
                        track={currentSong.track}
                        audioElem={audioElem}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        songs={songs}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                    />
                </div>
            )}
        </div>
    );
}

export default Play;
