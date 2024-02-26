import React from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";

function Player({
    audioElem,
    isPlaying,
    setIsPlaying,
    currentSong,
    songs,
    setCurrentSong,
}) {
    const playPause = () => {
        if (isPlaying) {
            audioElem.current.pause();
            setIsPlaying(false);
        } else {
            audioElem.current.play();
            setIsPlaying(true);
        }
    };

    const skipBack = () => {
        const index = songs.findIndex((x) => x.name == currentSong.name);
        if (index == 0) {
            setCurrentSong(songs[songs.length - 1]);
        } else {
            setCurrentSong(songs[index - 1]);
        }
        audioElem.current.currentTime = 0;
    };

    return (
        <div className="flex justify-center ">
            <BiSkipPrevious
                className="text-5xl text-white cursor-pointer"
                onClick={skipBack}
            />

            {isPlaying ? (
                <AiFillPauseCircle
                    className="text-5xl text-white cursor-pointer"
                    onClick={playPause}
                />
            ) : (
                <AiFillPlayCircle
                    className="text-5xl text-white cursor-pointer"
                    onClick={playPause}
                />
            )}

            <BiSkipNext className="text-5xl text-white cursor-pointer" />
        </div>
    );
}

export default Player;
