import React from "react";
import axios from "axios";

function Play() {
    const getSongs = () => {
        axios
            .get("http://localhost:8000/api/v1/song")
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <section>
            <h1 className="text-xl text-blue-600 flex justify-center h-full w-full p-48 flex-col ">
                Hi here the songs will be played:
                {getSongs}
            </h1>
        </section>
    );
}

export default Play;
