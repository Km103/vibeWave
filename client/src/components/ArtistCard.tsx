import Image from "next/image";
import React from "react";

function ArtistCard({
    name,
    image,
    onClick,
}: {
    name: string;
    image: string;
    onClick: any;
}) {
    return (
        <div>
            <div className="flex flex-col   items-center  rounded-xl px-4 py-2 w-full">
                <Image
                    src={image}
                    alt="artist"
                    width="150"
                    height="150"
                    className=" rounded-full hover:cursor-pointer hover:opacity-95"
                    onClick={onClick}
                />
                <div className="pt-4 text-xl font-semibold">{name}</div>
            </div>
        </div>
    );
}

export default ArtistCard;
