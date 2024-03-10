/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { prevSong, nextSong, playPause } from "@/redux/features/PlayersSlice";
import { usePlayerDispatch, usePlayerSelector } from "@/redux/store";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeBar from "./VolumeBar";

interface currentSong {
    progress: number;
    currentTime: number;
    duration: number;
    track: string;
    image: string;
    name: string;
    singer: string;
}

function Player() {
    const dispatch = usePlayerDispatch();
    const isPlaying = usePlayerSelector((state) => state.player.isPlaying);
    const activeSong = usePlayerSelector((state) => state.player.activeSong);
    const audioElem = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [currentSong, setCurrentSong] = useState<currentSong>(
        {} as currentSong
    );
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
            setCurrentSong(activeSong);
        }
    }, [activeSong, dispatch]);

    function onPlaying() {
        const duration = audioElem?.current?.duration ?? 0;
        const currentTime = audioElem?.current?.currentTime ?? 0;
        setCurrentSong({
            ...currentSong,
            progress: (currentTime / duration) * 100,
            currentTime: currentTime,
        });
    }
    const handleProgressClick = (e: any) => {
        const offset = e.nativeEvent.offsetX;
        const width = progressRef?.current?.clientWidth ?? 0;
        const percent = (offset / width) * 100;

        if (audioElem.current)
            audioElem.current.currentTime =
                (percent * activeSong.duration) / 100;
        setCurrentSong({ ...currentSong, progress: percent });
    };

    return (
        <div
            className="flex flex-col items-center 
        h-20 z-50 fixed bottom-0 w-screen  backdrop-blur-md shadow-2xl "
        >
            <audio
                src={activeSong.track}
                ref={audioElem}
                onEnded={() => dispatch(nextSong())}
                onTimeUpdate={onPlaying}
            />
            {currentSong && (
                <ProgressBar
                    progressRef={progressRef}
                    handleProgressClick={handleProgressClick}
                    currentSong={currentSong}
                />
            )}
            <div className=" flex flex-row items-center justify-between w-screen">
                <div className="flex flex-row basis-1/4 items-center justify-center">
                    <Image
                        src={activeSong.image}
                        alt="song"
                        width={48}
                        height={48}
                        className="rounded-lg"
                    />
                    <h1 className="text-white px-8 font-semibold">
                        {activeSong?.name?.split("(")[0]}
                    </h1>
                </div>

                <div className="flex flex-row items-center justify-evenly basis-2/4">
                    {currentSong.currentTime && (
                        <div className="basis-1/6 text-center">
                            {Math.floor(currentSong.currentTime / 60)}:
                            {Math.floor(currentSong.currentTime % 60) < 10
                                ? `0${Math.floor(currentSong.currentTime % 60)}`
                                : Math.floor(currentSong.currentTime % 60)}
                        </div>
                    )}
                    <div className="flex flex-row justify-center basis-4/6 w-full">
                        <h1 className="">{activeSong.singer?.split(",")[0]}</h1>
                        {activeSong.singer?.split(",")[1] && (
                            <h1 className="">
                                , {activeSong.singer?.split(",")[1]}
                            </h1>
                        )}
                    </div>

                    <div className="basis-1/6 text-center">
                        {Math.floor(activeSong.duration / 60)}:
                        {Math.floor(activeSong.duration % 60) < 10
                            ? `0${Math.floor(activeSong.duration % 60)}`
                            : Math.floor(activeSong.duration % 60)}
                    </div>
                </div>

                <div className="basis-1/4">
                    <Controls isPlaying={isPlaying} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
}

export default Player;
