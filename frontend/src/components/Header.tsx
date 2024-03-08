import Link from "next/link";
import React from "react";
import { PiWaveformThin } from "react-icons/pi";
import { PiWaveformDuotone } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "./ui/button";

function Header() {
    return (
        <header className="flex flex-row w-screen justify-between items-center border-b-2 z-50 h-24 px-8">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <div className="text-5xl px-2">
                        <PiWaveformDuotone />
                    </div>
                    <div className="text-2xl font-bold">VibeWave</div>
                </Link>
            </div>

            <div className="flex items-center border border-input rounded-xl px-4">
                <IoSearch className="text-xl font-bold" />
                <input
                    type="text-border"
                    className="w-80 h-10 px-4 bg-background focus:outline-none text-l"
                    placeholder="Search for Songs, Artists, Albums"
                />
            </div>

            <div>
                <Button className="bg-gray-200 hover:bg-gray-100 text-gray-800 font-md font-semibold">
                    Login
                </Button>
            </div>
        </header>
    );
}

export default Header;
