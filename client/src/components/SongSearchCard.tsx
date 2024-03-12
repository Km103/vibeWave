import Image from "next/image";
import React from "react";

function SongSearchCard({
    name,
    singer,
    image,
    onClick,
}: {
    name: string;
    singer: string;
    image: string;
    onClick: any;
}) {
    return (
        <div
            className="flex flex-row items-center h-20  border-b-2 hover:cursor-pointer rounded-lg border-border"
            onClick={onClick}
        >
            <img
                src={image}
                alt="song"
                className="w-24 h-24 rounded-md px-4  py-4 mr-4"
            />

            <div className="flex flex-row gap-x-96 basis-2/3 justify-start">
                <h1 className="text-lg font-bold basis-1/3">{name}</h1>
                <h2 className="text-md font-semibold basis-1/3">{singer}</h2>
            </div>
        </div>
    );
}

export default SongSearchCard;
