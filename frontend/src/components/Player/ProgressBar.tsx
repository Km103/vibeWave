import React from "react";

function ProgressBar({ progressRef, handleProgressClick, currentSong }: any) {
    return (
        <div
            className="w-screen  rounded-full h-1 mb-4 bg-border cursor-pointer"
            ref={progressRef}
            onClick={handleProgressClick}
        >
            <div
                className="bg-blue-600 h-1 rounded-full dark:primary"
                style={{
                    width: `${
                        currentSong.progress
                            ? currentSong.progress + "%"
                            : 0 + "%"
                    }`,
                }}
            ></div>
        </div>
    );
}

export default ProgressBar;
