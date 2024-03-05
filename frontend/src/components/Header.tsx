import Link from "next/link";
import React from "react";
import { PiWaveformThin } from "react-icons/pi";
import { PiWaveformDuotone } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
function Header() {
    return (
        <div
            className="flex flex-row w-screen   
            px-12   items-center border-b-2 z-50 h-20"
        >
            <GiHamburgerMenu className="text-3xl m-24 cursor-pointer" />
            <Link
                href="/"
                className="flex flex-row items-center basis-1/2 px-4    "
            >
                <div className="text-5xl ">
                    <PiWaveformDuotone />
                </div>
                <div className=" text-2xl font-bold">Vibewave</div>
            </Link>
            <div className="flex flex-row pl-36 basis-1/2">
                <div className="flex flex-row items-center border border-input px-4">
                    <IoSearch className="text-xl font-bold " />
                    <input
                        type="text-border"
                        className="w-80 h-10 px-4  bg-background  focus:outline-none rounded-md text-l"
                        placeholder="Search for Songs, Artists, Albums"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
