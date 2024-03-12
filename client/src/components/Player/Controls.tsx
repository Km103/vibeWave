import React from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { prevSong, nextSong, playPause } from "@/redux/features/PlayersSlice";

function Controls({ isPlaying, dispatch }: any) {
    return (
        <div className="flex justify-center ">
            <BiSkipPrevious
                className="text-5xl  cursor-pointer"
                onClick={() => dispatch(prevSong())}
            />

            {isPlaying ? (
                <AiFillPauseCircle
                    className="text-5xl  cursor-pointer"
                    onClick={() => dispatch(playPause(false))}
                />
            ) : (
                <AiFillPlayCircle
                    className="text-5xl  cursor-pointer"
                    onClick={() => dispatch(playPause(true))}
                />
            )}

            <BiSkipNext
                className="text-5xl  cursor-pointer"
                onClick={() => dispatch(nextSong())}
            />
        </div>
    );
}

export default Controls;
