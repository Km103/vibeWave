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
            <div className="flex flex-col items-center border-2 rounded-xl px-4 py-2 w-full">
                <Image
                    src={image}
                    alt="artist"
                    width="160"
                    height="160"
                    className="hover:cursor-pointer"
                    onClick={onClick}
                />
                <div className="pt-2 text-lg font-semibold">{name}</div>
            </div>
        </div>
    );
}

export default ArtistCard;
