"use client";
import React, { use } from "react";
import { Button } from "./ui/button";
import { FaHome } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { GrFavorite } from "react-icons/gr";
import { RiPlayList2Fill } from "react-icons/ri";
import { ScrollArea } from "./ui/scroll-area";

import { usePathname } from "next/navigation";
import Link from "next/link";

function Navbar() {
    const pathname = usePathname();
    return (
        <div className="pt-16 justify-start w-[14%] gap-y-4 px-4 flex flex-col border-r h-full fixed ">
            <div className="flex flex-col gap-y-2.5">
                <Link
                    href="/"
                    className={`link
                        ${
                            pathname === "/"
                                ? "px-4 py-4 w-full  bg-gray-800 text-l rounded-xl font-medium text-foreground"
                                : "px-4 py-4 w-full  text-l  font-medium text-foreground"
                        }  `}
                >
                    <FaHome className="inline-block text-2xl mr-2" />
                    Home
                </Link>
                <Link
                    href="/liked"
                    className={`link
                        ${
                            pathname === "/liked"
                                ? "px-4 py-4 w-full bg-gray-800 text-l rounded-xl font-medium text-foreground"
                                : "px-4 py-4 w-full  text-l  font-medium text-foreground"
                        }  `}
                >
                    <GrFavorite className="inline-block text-2xl mr-2" />
                    Liked Songs
                </Link>
            </div>

            <div className="w-full bg-bg text-2xl font-bold  pt-6 text-foreground ">
                Playlists
            </div>
            <Button className="w-full  text-l bg-primary">
                <RiPlayList2Fill className="inline-block text-xl mr-2" />
                Create Playlist
            </Button>

            <ScrollArea className="text-center">
                Login In order to Access the Playlists or create it
            </ScrollArea>
        </div>
    );
}

export default Navbar;
