import Image from "next/image";
import React from "react";

function AlbumCard({
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
            <div className="flex flex-col    items-center  rounded-xl px-4 py-2 ">
                <Image
                    src={image}
                    alt="Album"
                    width="170"
                    height="170"
                    className=" rounded-lg hover:cursor-pointer hover:opacity-95"
                    onClick={onClick}
                />
                <div className="pt-4 text-xl font-semibold">{name}</div>
            </div>
        </div>
    );
}

export default AlbumCard;
