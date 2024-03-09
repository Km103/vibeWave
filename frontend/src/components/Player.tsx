"use client";

import React, { use, useEffect, useRef } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { prevSong, nextSong, playPause } from "@/redux/features/PlayersSlice";
import { usePlayerDispatch, usePlayerSelector } from "@/redux/store";
import Image from "next/image";

function Player() {
    const dispatch = usePlayerDispatch();
    const isPlaying = usePlayerSelector((state) => state.player.isPlaying);
    const activeSong = usePlayerSelector((state) => state.player.activeSong);
    const audioElem = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isPlaying) {
            audioElem?.current?.play();
        } else {
            audioElem?.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && audioElem.current) {
            audioElem.current.currentTime = 0;
            audioElem.current.play();
        } else if (activeSong) {
            audioElem.current?.load();
            dispatch(playPause(true));
        }
    }, [activeSong, dispatch]);

    return (
        <div
            className=" flex justify-evenly items-center 
        h-20 z-50 border-t-2 fixed bottom-0 w-screen  backdrop-blur-sm shadow-2xl "
        >
            <audio
                src={activeSong.track}
                ref={audioElem}
                onEnded={() => dispatch(nextSong())}
            />
            <div className="flex flex-row items-center">
                <img
                    src={activeSong.image}
                    alt="cover"
                    className="w-12 h-12 rounded-lg"
                />
                <h1 className="text-white px-4 font-semibold">
                    {activeSong.name}
                </h1>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-white">
                    {activeSong.artist} - {activeSong.album}
                </h1>
                <h1 className="text-white">{activeSong.duration}</h1>
            </div>

            <div className="flex justify-center ">
                <BiSkipPrevious
                    className="text-5xl text-white cursor-pointer"
                    onClick={() => dispatch(prevSong())}
                />

                {isPlaying ? (
                    <AiFillPauseCircle
                        className="text-5xl text-white cursor-pointer"
                        onClick={() => dispatch(playPause(false))}
                    />
                ) : (
                    <AiFillPlayCircle
                        className="text-5xl text-white cursor-pointer"
                        onClick={() => dispatch(playPause(true))}
                    />
                )}

                <BiSkipNext
                    className="text-5xl text-white cursor-pointer"
                    onClick={() => dispatch(nextSong())}
                />
            </div>
        </div>
    );
}

export default Player;
