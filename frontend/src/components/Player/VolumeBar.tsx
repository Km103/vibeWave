import React from "react";

function VolumeBar({ currentSong }: any) {
    return (
        <div>
            <input
                type="range"
                min={0}
                max={currentSong.duration}
                value={currentSong.currentTime}
                onChange={() => {
                    console.log("change");
                }}
                className="h-0.5  bg-blue-600"
            />
        </div>
    );
}

export default VolumeBar;
