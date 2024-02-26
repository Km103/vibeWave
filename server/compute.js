async function getSongs(query = "", page = 1, limit = 10) {
    try {
        const response = await fetch(
            `${process.env.SONGS_URL}/search/songs?query=${query}&page=${page}&limit=${limit}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json(); // Parse the JSON response
        return data.data.results;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

import { collectAllSongs } from "./src/utils/SongQuery.js";
import fs from "fs";
// for (let i = 1; i < 200; i++) {
//     if (i % 10 === 0) await new Promise((resolve) => setTimeout(resolve, 500));
//     getSongs("A", i, 20)
//         .then((songs) => {
//             songs?.forEach((song) => {
//                 if (!mysongs.find((x) => x.id === song.id)) {
//                     mysongs.push(song);
//                 }
//             });
//             console.log(mysongs.length);
//         })
//         .catch((error) => {
//             console.error("Error processing songs:", error);
//         });
// }
const filePath = "my_da.json";
collectAllSongs()
    .then((songsData) => {
        const jsonData = {
            songs: songsData,
        };
        const jsonString = JSON.stringify(jsonData, null, 4);
        fs.writeFileSync(filePath, jsonString);
        console.log("JSON data written successfully to:", filePath);
    })
    .catch((error) => {
        console.error("Error processing songs:", error);
    });
