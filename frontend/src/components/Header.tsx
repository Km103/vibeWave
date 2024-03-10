import Link from "next/link";
import React from "react";
import { PiWaveformThin } from "react-icons/pi";
import { PiWaveformDuotone } from "react-icons/pi";

import { GiHamburgerMenu } from "react-icons/gi";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";

function Header() {
    return (
        <header className="flex z-0  flex-row w-screen justify-between items-center border-b-2  h-24 px-8">
            <div className="flex items-center">
                <Link href="/" className="flex items-center">
                    <div className="text-5xl px-2">
                        <PiWaveformDuotone />
                    </div>
                    <div className="text-2xl font-bold">VibeWave</div>
                </Link>
            </div>

            <SearchBar />

            <div>
                <Button className="bg-gray-200 hover:bg-gray-100 text-gray-800 font-md font-semibold">
                    Login
                </Button>
            </div>
        </header>
    );
}

export default Header;
