import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
    playPause,
    setActiveSong,
    setFullScreen,
} from "@/redux/features/playerSlice";
import { BiHeadphone } from "react-icons/bi";
import { useSelector } from "react-redux";

function ListenAgainCard({ song, index, SongData }) {
    const dispatch = useDispatch();
    const activeSong = useSelector((state) => state.player.activeSong);

    const handlePlayClick = (song, index) => {
        dispatch(setActiveSong({ song, data: SongData, i: index }));
        dispatch(playPause(true));
        dispatch(setFullScreen(true));
    };
    return (
        <div>
            <div
                onClick={() => {
                    handlePlayClick(song, index);
                }}
                className={`flex w-40 md:w-80 items-center mt-4 cursor-pointer group border-b-[1px] border-gray-500 justify-between ${
                    activeSong?.id === song?.id && " text-[#00e69d]"
                }`}
            >
                <div className="flex items-center gap-5">
                    <div className=" relative mb-2">
                        <img
                            src={song?.album?.image}
                            alt={song?.name}
                            width={50}
                            height={50}
                            className=""
                        />
                        {activeSong?.id === song?.id ? (
                            <BiHeadphone
                                size={27}
                                className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#00e6e6]"
                            />
                        ) : (
                            <BsPlayFill
                                size={25}
                                className=" group-hover:block hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200"
                            />
                        )}
                    </div>
                    <div className=" w-24 md:w-64">
                        <p className="text-sm lg:text-lg font-semibold truncate">
                            {song?.name
                                ?.replace("&#039;", "'")
                                ?.replace("&amp;", "&")}
                        </p>
                        <p className="text-gray-400 truncate text-xs">
                            {song?.primaryArtists}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListenAgainCard;