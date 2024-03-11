import React from "react";

function VolumeBar({ volume, setVolume }: any) {
    return (
        <div className="items-center">
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="h-1 w-24 accent-primary "
            />
        </div>
    );
}

export default VolumeBar;
